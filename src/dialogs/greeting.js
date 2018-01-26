module.exports = function (bot) {
  bot.dialog('greeting', [
    function (session, args, next) {
      session.send('Hello, you are in greeting dialog!')
      session.endDialog()
    }
  ])
}
