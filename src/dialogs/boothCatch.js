module.exports = function (bot) {
  bot.dialog('boothCatch', [
    function (session, args, next) {
      session.send('Come by the booth and talk with our mentors! They will be better equipped to answer your question.')
      session.endDialog()
    }
  ])
}
