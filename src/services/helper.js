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

const getSurveyPromo = () => {
  const {getSurveyInfo} = queries
  return callAPI(getSurveyInfo, {hackathonId})
    .then(data => ({
      prize: data.data.hackathon.survey_prize,
      promo: data.data.hackathon.survey_promo,
      link: data.data.hackathon.survey_link
    }))
}

const getSurveyData = () => {
  const {getSurveyQuestions} = queries
  return callAPI(getSurveyQuestions, {hackathonId})
    .then(data => {
      if (data.data.hackathon.surveys.length === 0) {
        return ({})
      }
      return ({
        hackathonId: data.data.hackathon.id,
        surveyId: data.data.hackathon.surveys[0].id,
        title: data.data.hackathon.surveys[0].title,
        prize: data.data.hackathon.surveys[0].prize,
        promo: data.data.hackathon.surveys[0].promo,
        surveyQuestions: data.data.hackathon.surveys[0].survey_questions
      })
    })
}

const createSurveySubmission = (surveyResult) => {
  const {createSurveySubmission} = queries
  return callAPI(createSurveySubmission, {surveyResult})
    .then(result => result)
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
    .then((response) => {
      const mentors = response.data.hackathon.mentors || []
      return mentors.map((mentor) => {
        return {
          skills: mentor.skills,
          name: mentor.first_name + ' ' + mentor.last_name,
          bio: mentor.bio
        }
      })
    })
}

const getSessionData = () => {
  const { getSessions } = queries
  const variables = { 'hackathonId': process.env.HACKATHON_ID }
  return callAPI(getSessions, variables)
    .then((response) => {
      return response.data.hackathon.sessions || []
    })
}

const getTechData = () => {
  const {getTechnologies} = queries
  const variables = { 'hackathonId': process.env.HACKATHON_ID }

  return callAPI(getTechnologies, variables)
    .then(data => data.data.hackathon.technologies)
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
   * Retrieve survey promotion data
   *
   * @return {{ string: link, string: prize, string: promo }} Promise
   */
  getSurveyPromo,

  /**
   * Retrieve survey data to prompt user
   *
   * @return Promise
   */
  getSurveyData,

  /**
   * Submit survey on user completion
   *
   * @return Promise
   */
  createSurveySubmission,

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
   * Retrieve session data
   * @return {{ string: name, string: day, string: time, string: description}}
   */
  getSessionData,
  /**
   * Retrieve Microsoft competition information
   * Includes: Competition text, prizes and qualifying technology
   */
  getCompetitionData
}
