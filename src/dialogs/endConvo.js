const { getSurveyData } = require('../services/helper')

module.exports = function (bot) {
  bot.dialog('endConvo', [
    function (session, args, next) {
      session.send('Thanks for chatting! Come by the booth or talk to me more!')

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
