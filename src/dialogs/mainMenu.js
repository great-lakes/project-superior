var builder = require('botbuilder')

const choice1 = 'Get Azure code'
const choice2 = 'Get technology examples'
const choice3 = 'Learn about the Microsoft Team'
const choice4 = 'Ask the team a question'
const choice5 = 'Azure Code does not work'
const choice6 = 'Nevermind'

module.exports = function (bot) {
  bot.dialog('mainMenu', [
    function (session, args, next) {
      session.send('Let me show you what I can help you with.')
      builder.Prompts.choice(
        session,
        'Select a choice',
        [choice1, choice2, choice3, choice4, choice5, choice6]
      )
    },
    function (session, args, next) {
      switch (args.response.index) {
        case 0: // Get Azure Code
          session.beginDialog('azureCode')
          break
        case 1: // Get technology examples
          session.beginDialog('techHelp')
          break
        case 2: // Learn about the team
          session.beginDialog('teamInfo')
          break
        case 3: // Ask the team a question
          session.beginDialog('askQuestion')
          break
        case 4: // Azure code Error
          session.beginDialog('azureCodeError')
          break
        case 5: // Nevermind
          session.replaceDialog('endConvo')
          return
      }
      session.replaceDialog('isSatisfied')
    }
  ])
}
