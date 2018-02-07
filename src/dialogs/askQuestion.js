module.exports = function (bot) {
  bot.dialog('askQuestion', [
    function (session, args, next) {
      session.send('Hello, you are in askQuestion dialog!')
      session.endDialog()
    }
  ])
}
