module.exports = function (bot) {
  bot.dialog('azureCodeError', [
    function (session, args, next) {
      session.send('Sorry you are having issues with your Azure Code! Please head to the booth, where the Microsoft mentors will gladly help you.')
      session.endDialog()
    }
  ])
}
