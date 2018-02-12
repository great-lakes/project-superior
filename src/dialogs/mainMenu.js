var builder = require('botbuilder')

const choicesArr = [
  {
    dialogName: 'azureCode',
    choiceText: 'Get Azure code'
  },
  {
    dialogName: 'teamInfo',
    choiceText: 'Get to know the Microsoft Team'
  },
  {
    dialogName: 'techHelp',
    choiceText: 'Get technology help'
  },
  {
    dialogName: 'askQuestion',
    choiceText: 'Ask the team a question'
  },
  {
    dialogName: 'qualifyingRules',
    choiceText: 'See qualifying rules and prizes'
  },
  {
    dialogName: 'showSurvey',
    choiceText: 'Take the survey to enter raffle'
  },
  {
    dialogName: 'azureCodeError',
    choiceText: 'Azure code does not work'
  },
  {
    dialogName: 'endConvo',
    choiceText: 'Nevermind'
  }
]

module.exports = function (bot) {
  bot.dialog('mainMenu', [
    function (session, args, next) {
      session.send('Let me show you what I can help you with.')
      builder.Prompts.choice(
        session,
        'Select a choice',
        choicesArr.map(item => item.choiceText)
      )
    },
    function (session, args, next) {
      const choiceIndex = args.response.index
      const { dialogName } = choicesArr[choiceIndex]

      if (dialogName === 'endConvo') {
        session.replaceDialog('endConvo')
        return
      }

      // all synchronous dialogs
      if (dialogName === 'azureCodeError') {
        session.beginDialog(dialogName)
        session.replaceDialog('isSatisfied')
      }

      // all asynchronous dialogs
      session.replaceDialog(dialogName)
    }
  ])
}
