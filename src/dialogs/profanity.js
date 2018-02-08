module.exports = function (bot) {
  bot.dialog('profanity', [
    function (session, args, next) {
      session.send('Hello, you are in profanity dialog!')
      session.endDialog()
    }
  ])
}
