module.exports = function (bot) {
  bot.dialog('greeting', [
    function (session, args, next) {
      session.send('Hello HackIllinois Hacker!')
      session.sendTyping()
      session.send("I'm Hanna, Microsoft's hackathon bot. What can I help you with?")
      session.endDialog()
    }
  ])
}
