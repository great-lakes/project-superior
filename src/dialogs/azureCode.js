var builder = require('botbuilder')
var {getAzureCode, getSurveyData} = require('../services/helper.js')
var { sendMail } = require('../services/sendEmail.js')

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
      Promise.all([getAzureCode(session.dialogData), getSurveyData()])
      .then(([azureCode, {prize, link}]) => {
        if (azureCode) {
          sendMail(session.dialogData.studentEmail, azureCode, link, prize)
          session.send('Your Azure Code has been sent to your email.')
          session.replaceDialog('isSatisfied')
          return
        }
        session.send('Sorry we are out of Azure Codes :/ Come by the booth for more help.')
      })
    }
  ])
}
