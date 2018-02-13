require('dotenv').config()
const { mentors } = require('../graphql/queries')
const fetch = require('node-fetch')

const url = process.env.GRAPHQL_API_URL

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
    // TODO: Implement
    // if (!json.azureCode) {
    //   throw new Error('No azure code')
    // }
    return json
  })
}

const getSurveyData = () => {
  const query = {
    link: 'aka.ms/hackillinois18',
    prize: 'GoPro Hero 6',
    promo: 'Complete our survey at aka.ms/hackillinois18 and you could win a GoPro Hero 6!'
  }
  return callAPI(query)
}

const createQuestion = (questionData) => {
  // questionData.name
  // questionData.email
  // questionData.question
  // hackathon id

  const query = {
  }
  return callAPI(query)
}

const getAzureCode = () => {
  // name
  // email
  // project name
  // project description
  const query = {

  }
  return callAPI(query)
}

const getTeamData = () => {
  const query = mentors
  const variables = { 'hackathonId': process.env.HACKATHON_ID }
  return callAPI(query, variables)
}

const getTechData = () => {
  const query = [{
    name: 'Azure',
    help_text: 'azure is cool.',
    doc_link: 'https://azure.example'
  }, {
    name: 'Bot Framework',
    help_text: 'Bots are a great way to create artificial human interaction with your users. Combine bots with Cognitive Services and you will be able to create an intelligent chatbot capable of understanding language intentions and much more.',
    doc_link: 'https://dev.botframework.gettingStarted.example'
  }, {
    name: 'Cognitive Services',
    help_text: 'AI is pretty cool.. use this',
    doc_link: 'https://CogServ.example'
  }]
  return callAPI(query)
}

const getCompetitionData = () => {
  const query = {
    hack_text: 'Interested in competing for the Best Use of Microsoft Technology? Our team of Microsoft hackers and mentors are ready to help and answer any questions you may have. From questions to our technology, to architecting and implementing your hack let us know how we can help!',
    prize_text: 'Surface Pros for the winning team! (4-person limit)',
    qualifyingTech_text: 'Azure, Bing, Bot Framework, Cognitive Services, HoloLens, Windows10. Check out docs.microsoft.com for resources and tools to get started with hacking Microsoft technology.'
  }
  return callAPI(query)
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
