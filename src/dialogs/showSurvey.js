// const function = require('../services/FUNCTION')

module.exports = function (bot) {
  bot.dialog('showSurvey', [
    function (session, args, next) {
      // set completeSurvey flag so we do not advertise on endConvo
      session.conversationData.completeSurvey = true

      // TODO pull from API: Prize and Link
      // function().then((surveyObj))
      const surveyObj = {
        link: 'aka.ms/hackillinois18',
        prize: 'GoPro Hero 6',
        promo: 'Complete our survey at aka.ms/hackillinois18 and you could win a GoPro Hero 6!'
      }

      session.send('Here is the link to the survey: ' + surveyObj.link)
      session.sendTyping()

      let message = 'Thanks for taking the survey. You will be entered to win: ' + surveyObj.prize + '!\n\n'
      message += 'We will notify the winner via email near the closing ceremony - Good Luck!'
      session.send(message)
      session.endDialog()
    }
  ])
}
