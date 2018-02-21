const { getSurveyData } = require('../services/helper')

module.exports = function (bot) {
  bot.dialog('showSurvey', [
    function (session, args, next) {
      // set completeSurvey flag so we do not advertise on endConvo
      session.conversationData.completeSurvey = true

      return getSurveyData()
      .then((surveyObj) => {
        session.send('Here is the link to the survey: ' + surveyObj.link)
        session.sendTyping()

        let message = 'Thanks for taking the survey. You will be entered to win: ' + surveyObj.prize + '!\n\n'
        message += 'We will notify the winner via email near the closing ceremony - Good Luck!'
        session.send(message)

        // remember to ask here since async dialog
        session.replaceDialog('isSatisfied')
      })
      .catch(() => {
        let message = "Sorry, I don't seem to remember the link and prizes... Please come by the booth and chat with us to find out more."
        session.send(message)
        session.replaceDialog('isSatisfied')
      })
    }
  ])
}
