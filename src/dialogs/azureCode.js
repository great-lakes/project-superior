var builder = require('botbuilder')
var {getAzureCode, getSurveyPromo} = require('../services/helper.js')
var { sendMail } = require('../services/sendEmail.js')

module.exports = function (bot) {
  bot.dialog('azureCode', [
    function (session, args, next) {
      builder.Prompts.text(session, "Let's get you an Azure code! First, what is your full name?")
    },
    function (session, args) {
      session.dialogData.studentName = args.response
      builder.Prompts.text(session, 'What is your email? (I will send the Azure code to your email.)')
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
      Promise.all([getAzureCode(session.dialogData), getSurveyPromo()])
      .then(([azureCode, {prize}]) => {
        if (azureCode) {
          sendMail(session.dialogData.studentEmail, azureCode, prize)
          session.send('Your Azure code has been sent to your email.')
          session.replaceDialog('isSatisfied')
          return
        }
        session.send('So sorry, we are out of Azure codes! Please come by the booth for more help.')
      })
    }
  ])
}
