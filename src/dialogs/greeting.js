module.exports = function (bot) {
  bot.dialog('greeting', [
    function (session, args, next) {
      session.send('Hello HackIllinois Hacker!')
      session.sendTyping()

      let message = "I'm Hanna, Microsoft's hackathon bot. What can I help you with?\n\n"
      message += 'If you would like some examples of what I can do ask me!'
      session.send(message)
      session.endDialog()
    }
  ])
}
