module.exports = function (bot) {
  bot.dialog('azureCode', [
    function (session, args, next) {
      session.send('Hello, I can help you get Azure Codes!')
      session.endDialog()
    }
  ])
}
