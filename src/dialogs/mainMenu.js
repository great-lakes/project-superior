module.exports = function (bot) {
  bot.dialog('mainMenu', [
    function (session, args, next) {
      session.send('Hello, you are in the main menu!')
      session.send('Select from these options...')
      session.endDialog()
    }
  ])
}
