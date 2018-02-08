module.exports = function (bot) {
  bot.dialog('showSurvey', [
    function (session, args, next) {
      session.send('Hello, you are in showSurvey dialog!')
      session.endDialog()
      // TODO pull from API: Prize and Link

      // Here is the link to the survey
      // session.send('Survey Link: TODO:SURVEY_LINK')

      // Thanks for taking the survey! You will be entered to win
      // session.send('Make sure to take the survey to enter raffle for a TODO:PRIZE!')
      // session.endDialog()
    }
  ])
}
