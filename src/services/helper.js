require('dotenv').config()
const fetch = require('fetch')

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
  getAzureCode
}

const url = process.env.API_URL

const getSurveyData = () => {
  // TODO: correctly returning promise?
  return new Promise((resolve, reject) => {
    resolve(
      fetch(

      ).then(res => res.json())
      .then(surveyData => surveyData)
    )
  })
}

const setStudentData = (studentData) => {
// studentData.name
// studentData.email
// etc..
}

const isEmailUnique = (userEmail) => {
  return fetch(
    url,
    {
      method: 'POST',
      body: JSON.stringify(userEmail),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(res => res.json())
}
const getAzureCode = () => {
  return fetch(

  ).then(res => res.json())
  .then(azureCode => azureCode)
}
