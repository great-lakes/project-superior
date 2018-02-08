module.exports = function (bot) {
  bot.dialog('showSurvey', [
    function (session, args, next) {
      session.send('Hello, you are in showSurvey dialog!')
      session.endDialog()

      // TODO pull from API: Prize and Link
      // session.send('Make sure to take the survey to enter raffle for a TODO:PRIZE!')
      // session.send('Survey Link: TODO:SURVEY_LINK')
      // session.endDialog()
    }
  ])
}
