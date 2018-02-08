var builder = require('botbuilder')

const choicesArr = [
  {
    dialogName: 'azureCode',
    choiceText: 'Get Azure code'
  },
  {
    dialogName: 'techHelp',
    choiceText: 'Get technology help'
  },
  {
    dialogName: 'teamInfo',
    choiceText: 'Get to know the Microsoft Team'
  },
  {
    dialogName: 'askQuestion',
    choiceText: 'Ask the team a question'
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

      session.beginDialog(dialogName)
      session.replaceDialog('isSatisfied')
    }
  ])
}
