module.exports = function (bot) {
  bot.dialog('teamInfo', [
    function (session, args, next) {
      session.send('Hello, you are in teamInfo dialog!')
      session.endDialog()
    }
  ])
}
