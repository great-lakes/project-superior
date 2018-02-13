var builder = require('botbuilder')

module.exports = function (bot) {
  bot.dialog('isSatisfied', [
    function (session, args, next) {
      builder.Prompts.confirm(
        session,
        'Can I do anything else for you? (yes/no)'
      )
    },
    function (session, args, next) {
      if (args.response) { // yes
        // prompt for a new question to be handled at root
        session.send('What else can I help you with?')
        session.endDialog()
        return
      }
      session.replaceDialog('endConvo')
    }
  ])
}
