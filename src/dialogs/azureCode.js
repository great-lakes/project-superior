var builder = require('botbuilder')
var helper = require('../services/helper.js')

module.exports = function (bot) {
  bot.dialog('azureCode', [
    function (session, args, next) {
      builder.Prompts.text('Lets get you an Azure Code! First what is your full name?')

      // remember to ask here since async dialog
     // session.replaceDialog('isSatisfied')
    },
    function (session, results) {
      session.dialogData.studentName = results.response
      builder.Prompts.text('Please tell me your email. This is needed so that your Azure code can be sent to you.')
    },
    function (session, results) {
      if (validEmail(results.response)) {
        session.dialogData.studentEmail = results.response
        builder.Prompts.text('What is the name of your project?')
      }
      // should i make each waterfall a function?
      // how to look until true
    },
    function (session, results) {
      session.dialogData.projectName = results.response
      builder.Prompts.text('Lastly, please give a brief description of your project')
    },
    function (session, results) {
      session.dialogData.projectDescription = results.response
      getAzureCode(session.dialogData)
      session.send('Your Azure Code has been sent')
      session.replaceDialog('isSatisfied')
    }
  ])
}

function validEmail (email) {
  helper.isEmailUnique(email, function (err, res) {
    if (err) { return false }
    return true
  })
}

function setStudent (student, azureCode) {
  helper.setStudentData({
    name: student.studentName,
    email: student.studentEmail,
    projectName: student.projectName,
    projectDescription: student.projectDescription,
    azureCode: azureCode
  })
}

function getAzureCode (student) {
  helper.getAzureCode(function (err, res) {
    if (err) {
      // email mentors
    }
    setStudent(student, res) // TODO: change to exact object location
  })
}

/*
Add Student Info
Name
Email
Project Name
Description
Give code through email
*/
