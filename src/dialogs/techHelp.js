const { getTechData } = require('../services/helper')
const builder = require('botbuilder')

module.exports = function (bot) {
  bot.dialog('techHelp', [
    function (session, args, next) {
      session.sendTyping()

      return getTechData()
      .then((result) => {
        session.conversationData.techData = result
        builder.Prompts.choice(
          session,
          'I have info and docs on these technologies:',
          result.map(tech => tech.name)
        )
      })
    },
    function (session, args, next) {
      let techData = session.conversationData.techData
      let message = techData[args.response.index].name + ':\n\n'
      message += techData[args.response.index].help_text
      session.send(message)

      session.sendTyping()

      message = 'Check out these docs to get started and find more info:\n\n'
      message += techData[args.response.index].doc_link
      session.send(message)

      session.sendTyping()

      session.send("I hope this helps, if not feel free to come by the booth or say 'submit a question'")

      // remember to ask here since async dialog
      session.replaceDialog('isSatisfied')
    }
  ])
}
