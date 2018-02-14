var builder = require('botbuilder')
var helper = require('../services/helper.js')

module.exports = function (bot) {
  bot.dialog('azureCode', [
    function (session, args, next) {
      builder.Prompts.text('Lets get you an Azure Code! First what is your full name?')
    },
    function (session, results) {
      session.dialogData.studentName = results.response
      builder.Prompts.text('Please tell me your email. This is needed so that your Azure code can be sent to you.')
    },
    function (session, results) {
      session.dialogData.studentEmail = results.response
      builder.Prompts.text('What is the name of your project?')
    },
    function (session, results) {
      session.dialogData.projectName = results.response
      builder.Prompts.text('Lastly, please give a brief description of your project.')
    },
    function (session, results) {
      session.dialogData.projectDescription = results.response
      return getAzureCode(session.dialogData)
      .then(azureCode => {
        if (azureCode) {
          session.send('Your Azure Code has been sent to your email.')
          session.replaceDialog('isSatisfied')
        // send email
          return
        }
        session.send('Sorry we are out of Azure Codes :/ Come by the booth for more help.')
      })
    }
  ])
}

function getAzureCode (student) {
  return helper.getAzureCode({
    name: student.studentName,
    email: student.studentEmail,
    projectName: student.projectName,
    projectDescription: student.projectDescription
  })
}
