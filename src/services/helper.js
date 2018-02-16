require('dotenv').config()
const queries = require('../graphql/queries')
const fetch = require('node-fetch')

const url = process.env.GRAPHQL_API_URL
const hackathonId = process.env.HACKATHON_ID

/**
 * Returns promise which will contain query result.
 *
 * @param {*} query - GraphQL query
 */
const callAPI = (query, variables) => {
  return fetch(url,
    {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(res => res.json())
  .then(json => {
    if (json.errors) {
      throw new Error('Request failed')
    }
    return json
  })
}

const getSurveyData = () => {
  const {getSurvey} = queries
  return callAPI(getSurvey, {hackathonId})
    .then(data => ({
      prize: data.data.hackathon.survey_prize,
      link: data.data.hackathon.survey_link,
      promo: data.data.hackathon.survey_promo
    }))
}

const createQuestion = ({name: studentName, email: studentEmail, question}) => {
  const {newQuestion} = queries
  const variables = {
    hackathonId,
    studentEmail,
    studentName,
    question
  }
  return callAPI(newQuestion, variables)
}

const getAzureCode = ({studentName, studentEmail, projectName, projectDescription}) => {
  const {getAzureCode} = queries
  const variables = {
    hackathonId,
    studentName,
    studentEmail,
    projectName,
    projectDescription
  }
  return callAPI(getAzureCode, variables)
    .then(response => response.data.issueUnclaimedAzurecode ? response.data.issueUnclaimedAzurecode.code : null) // just respond with the code
}

const getTeamData = () => {
  const { mentors } = queries
  const variables = { 'hackathonId': process.env.HACKATHON_ID }
  return callAPI(mentors, variables)
}

const getTechData = () => {
  const {getTechnologies} = queries
  const variables = { 'hackathonId': process.env.HACKATHON_ID }

  return callAPI(getTechnologies, variables).then(data => data.data.hackathon.technologies)
}

const getCompetitionData = () => {
  const result = {
    hack_text: 'Interested in competing for the Best Use of Microsoft Technology? Our team of Microsoft hackers and mentors are ready to help and answer any questions you may have. From questions to our technology, to architecting and implementing your hack let us know how we can help!',
    prize_text: 'Surface Pros for the winning team! (4-person limit)',
    qualifyingTech_text: 'Azure, Bing, Bot Framework, Cognitive Services, HoloLens, Windows10. Check out docs.microsoft.com for resources and tools to get started with hacking Microsoft technology.'
  }
  return result
}

module.exports = {
  /**
   * Retrieve survey data
   *
   * @return {{ string: link, string: prize, string: promo }} Promise
   */
  getSurveyData,

  /**
   * Store user question in database
   *
   * @param {{ string: name, string: email, string: question }}
   *
   * @return {boolean} Promise
   */
  createQuestion,

  /**
   * Retrieve new Azure Code
   *
   * @return {string} Promise
   */
  getAzureCode,

  /**
   * Retrieve mentor's data who is present at event
   *
   * @return {{ string: name, string[]: skills, string: bio }[]} Promise
   */
  getTeamData,

  /**
   * Retrieve tech data with docs and descriptions
   *
   * @return {{ string: name, string: help_text, string: doc_link }[]}
   */
  getTechData,

  /**
   * Retrieve Microsoft competition information
   * Includes: Competition text, prizes and qualifying technology
   */
  getCompetitionData
}
