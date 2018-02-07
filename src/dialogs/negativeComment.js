module.exports = function (bot) {
  bot.dialog('negativeComment', [
    function (session, args, next) {
      session.send('Hello, you are in negativeComment dialog!')
      session.endDialog()
    }
  ])
}
