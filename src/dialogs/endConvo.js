const { getSurveyData } = require('../services/helper')

module.exports = function (bot) {
  bot.dialog('endConvo', [
    function (session, args, next) {
      session.send("Thanks for chatting! If this did not help come by the booth or say 'submit a question'")

      // if user has not completed survey, advertise
      if (!session.conversationData.completeSurvey) {
        return getSurveyData()
          .then((surveyObj) => {
            session.sendTyping()
            session.send(surveyObj.promo)
            session.endDialog()
          })
      }

      session.endDialog()
    }
  ])
}
