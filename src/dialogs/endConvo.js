module.exports = function (bot) {
  bot.dialog('endConvo', [
    function (session, args, next) {
      session.send('Thanks for chatting! Come by the booth or talk to me more!')
      session.endDialog()
    }
  ])
}
