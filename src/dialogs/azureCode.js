var builder = require('botbuilder')
var helper = require('../services/helper.js')

module.exports = function (bot) {
  bot.dialog('azureCode', [
    function (session, args, next) {
      builder.Prompts.text(session, "Let's get you an Azure Code! First what is your full name?")
    },
    function (session, args) {
      session.dialogData.studentName = args.response
      builder.Prompts.text(session, 'What is your email? (I will send the azure code to your email.)')
    },
    function (session, args) {
      session.dialogData.studentEmail = args.response
      builder.Prompts.text(session, 'What is the name of your project?')
    },
    function (session, args) {
      session.dialogData.projectName = args.response
      builder.Prompts.text(session, 'Lastly, please give a brief description of your project.')
    },
    function (session, args) {
      session.dialogData.projectDescription = args.response
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

function getAzureCode ({studentName, studentEmail, projectName, projectDescription}) {
  return helper.getAzureCode({
    studentName,
    studentEmail,
    projectName,
    projectDescription
  })
}
