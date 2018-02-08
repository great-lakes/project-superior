module.exports = function (bot) {
  bot.dialog('botHelp', [
    function (session, args, next) {
      let message = "Here's what I can do:\n\n"
      message += "To get Azure Credits, say 'I want an Azure code'.\n\n"
      message += "To learn about Microsoft's hack team, say 'Tell me about the team'.\n\n"
      message += "To get tech examples and docs, say 'Show me documentation'.\n\n"
      message += "To ask the team a question, say 'I have a question'.\n\n"
      message += "To see qualifying tech and prizes, , say 'How do I qualify?'.\n\n"
      message += "To complete the survey to enter raffle, say 'Show me survey'.\n\n"
      message += "If your Azure code does not work, say 'My code does not work'.\n\n"
      message += "To see a menu, say 'Show me the menu'."

      session.send(message)
      session.endDialog()
    }
  ])
}
