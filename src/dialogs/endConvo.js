module.exports = function (bot) {
  bot.dialog('endConvo', [
    function (session, args, next) {
      session.send('Thanks for chatting! Come by the booth or talk to me more!')
      session.sendTyping()

      // TODO pull from API: Prize and Link
      session.send('Make sure to take the survey to enter raffle for a TODO:PRIZE!')
      session.send('Survey Link: TODO:SURVEY_LINK')
      session.endDialog()
    }
  ])
}
