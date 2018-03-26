const { getSurveyPromo } = require('../services/helper')

module.exports = function (bot) {
  bot.dialog('endConvo', [
    function (session, args, next) {
      session.send("Thanks for chatting! If this did not help, come by the booth, or say, 'submit a question'.")

      // if user has not completed survey, advertise
      if (!session.conversationData.takeSurvey) {
        return getSurveyPromo()
          .then((surveyObj) => {
            session.sendTyping()
            session.send(surveyObj.promo)
            session.endDialog()
          })
          .catch(() => {
            session.endDialog()
          })
      }

      session.endDialog()
    }
  ])
}
