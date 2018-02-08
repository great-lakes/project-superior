module.exports = function (bot) {
  bot.dialog('azureCodeError', [
    function (session, args, next) {
      session.send('Hello, you are in azureCodeError dialog!')
      session.endDialog()
    }
  ])
}
