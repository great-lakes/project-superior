module.exports = function (bot) {
  bot.dialog('techHelp', [
    function (session, args, next) {
      session.send('Hello, you are in techHelp dialog!')
      session.endDialog()
    }
  ])
}
