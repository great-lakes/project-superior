const { getSurveyData, submitSurveyResult } = require('../services/helper')
const builder = require('botbuilder')

module.exports = function (bot) {
  bot.dialog('takeSurvey', [
    function (session, args, next) {
      // initialize survey data
      if (session.conversationData.takeSurvey) {
        next()
        return
      }

      // first time entering `takeSurvey` dialog
      return getSurveyData()
        .then(({ prize, questions }) => {
          // store data and initialize count
          session.conversationData.surveyQuestions = questions
          session.conversationData.surveyQuestionCount = 0
          session.conversationData.surveyPrize = prize
          session.conversationData.surveyResults = []
          // set takeSurvey flag so we do not advertise on endConvo
          session.conversationData.takeSurvey = true
          next()
        })
        .catch(() => {
          let message = "Sorry, I don't seem to remember the questions... Please come by the booth and chat with us to find out more."
          session.send(message)
          session.replaceDialog('isSatisfied')
        })
    }, function (session, args, next) {
      // evaluate
      // check if all questions have been asked
      if (session.conversationData.surveyQuestions.length === session.conversationData.surveyQuestionCount) {
        // survey complete
        // let message = 'Thanks for taking the survey. You will be entered to win: ' + session.conversationData.surveyPrize + '!\n\n'
        // message += 'We will notify the winner via email near the closing ceremony - Good Luck!'
        // session.send(message)

        let msgCard = new builder.Message(session)
        msgCard.attachments([
          new builder.HeroCard(session)
            .title('Survey Complete: Thank You!')
            .subtitle('Entered to win: ' + session.conversationData.surveyPrize + '!')
            .text('We will notify the winner via email near the closing ceremony - Good Luck!')
            .images([builder.CardImage.create(session, 'https://greatlakesblob.blob.core.windows.net/hannabot/ninja-cat-min.jpg')])
        ])
        session.send(msgCard)

        // submit to API
        submitSurveyResult(session.conversationData.surveyResults)

        // remember to ask here since async dialog
        session.replaceDialog('isSatisfied')
      }
      next()
    }, function (session, args, next) {
      // ask question
      const surveyQuestions = session.conversationData.surveyQuestions
      const surveyQuestionCount = session.conversationData.surveyQuestionCount
      const currentQuestion = surveyQuestions[surveyQuestionCount]

      if (currentQuestion.option.type === 'choice') {
        session.sendTyping()
        builder.Prompts.choice(
          session,
          currentQuestion.prompt,
          currentQuestion.option.choices
        )
        return
      }

      session.sendTyping()
      builder.Prompts.text(session, currentQuestion.prompt)
    }, function (session, args, next) {
      // capture response
      if (args.response.entity) {
        session.conversationData.surveyResults[session.conversationData.surveyQuestionCount] = args.response.entity
      } else {
        session.conversationData.surveyResults[session.conversationData.surveyQuestionCount] = args.response
      }

      // increment count
      session.conversationData.surveyQuestionCount++

      // recursive call
      session.replaceDialog('takeSurvey')
    }
  ])
}
