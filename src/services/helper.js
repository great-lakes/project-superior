require('dotenv').config()
const fetch = require('fetch')

const url = process.env.GRAPHQL_API_URL

/**
 * Returns promise which will contain query result.
 *
 * @param {*} query - GraphQL query
 */
const callAPI = (query) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(query)
    }, 1000)
  })
  // return fetch(
  //   url,
  //   {
  //     method: 'POST',
  //     body: JSON.stringify(query),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }
  // ).then(res => res.json())
}

const getSurveyData = () => {
  const query = {
    link: 'aka.ms/hackillinois18',
    prize: 'GoPro Hero 6',
    promo: 'Complete our survey at aka.ms/hackillinois18 and you could win a GoPro Hero 6!'
  }
  return callAPI(query)
}

const setStudentData = (studentData) => {
  // studentData.name
  // studentData.email
  // etc..
  const query = {

  }
  return callAPI(query)
}

const isEmailUnique = (userEmail) => {
  const query = {

  }
  return callAPI(query)
}

const getAzureCode = () => {
  const query = {

  }
  return callAPI(query)
}

const getTeamData = () => {
  const query = [{
    name: 'Kevin',
    skills: ['skill1', 'skill2', 'skill3'],
    bio: "He's pretty cool"
  }]
  return callAPI(query)
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

module.exports = {
  /**
   * Retrieve survey data
   *
   * @return {{ string: link, string: prize, string: promo }} Promise
   */
  getSurveyData,

  /**
   * Store user date in database
   *
   * @param {{string: name, string: email}} studentData
   *
   * @return {boolean} Promise
   */
  setStudentData,

  /**
   * Determine if user's email is unique within Azure Code Table
   *
   * @param {string} userEmail
   *
   * @return {boolean} Promise
   */
  isEmailUnique,

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
   * Retrieve qualifying tech data with docs and descriptions
   *
   * @return {{ string: name, string: help_text, string: doc_link }[]}
   */
  getTechData
}
