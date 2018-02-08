module.exports = function (bot) {
  bot.dialog('endConvo', [
    function (session, args, next) {
      session.send('Thanks for chatting! Come by the booth or talk to me more!')

      // if user has not completed survey, advertise
      if (!session.conversationData.completeSurvey) {
        // TODO pull from API: Prize and Link
        // function().then((surveyObj))
        const surveyObj = {
          link: 'aka.ms/hackillinois18',
          prize: 'GoPro Hero 6',
          promo: 'Complete our survey at aka.ms/hackillinois18 and you could win a GoPro Hero 6!'
        }

        session.sendTyping()
        session.send(surveyObj.promo)
      }
      session.endDialog()
    }
  ])
}
