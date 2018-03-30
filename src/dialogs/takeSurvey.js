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
        .then(surveyObj => {
          if (Object.keys(surveyObj).length === 0) {
            let message = "Sorry, I don't seem to remember the questions... Please come by the booth and chat with us to find out more."
            session.send(message)
            session.replaceDialog('isSatisfied')
          }

          const { prize, surveyQuestions } = surveyObj
          const registrationQuestions = [{
            prompt: 'What is your name?',
            option: {
              type: 'TEXT'
            }
          }, {
            prompt: 'What is your email? (we want to contact you if you win!)',
            option: {
              type: 'TEXT'
            }
          }]

          // store data and initialize count
          session.conversationData.surveyQuestions = [...registrationQuestions, ...surveyQuestions.sort(q => q.order)]
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
        let msgCard = new builder.Message(session)
        msgCard.attachments([
          new builder.HeroCard(session)
            .title('Survey Complete: Thank You!')
            .subtitle('Entered to win: ' + session.conversationData.surveyPrize + '!')
            .text('We will notify the winner via email after the hackathon - Good Luck!')
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

      if (currentQuestion.type === 'CHOICE') {
        session.sendTyping()
        builder.Prompts.choice(
          session,
          currentQuestion.prompt,
          currentQuestion.survey_choices.sort(choice => choice.order)
        )
        return
      }

      session.sendTyping()
      builder.Prompts.text(session, currentQuestion.prompt)
    }, function (session, args, next) {
      // first question: name
      if (session.conversationData.surveyQuestionCount === 0) {
        session.conversationData.name = args.response
      }

      // second question: email
      if (session.conversationData.surveyQuestionCount === 1) {
        session.conversationData.email = args.response
      }

      // capture response
      if (args.response.entity) { // capture choice selected
        session.conversationData.surveyResults[session.conversationData.surveyQuestionCount] = args.response.entity
      } else { // capture text entered
        session.conversationData.surveyResults[session.conversationData.surveyQuestionCount] = args.response
      }

      // increment count
      session.conversationData.surveyQuestionCount++

      // recursive call
      session.replaceDialog('takeSurvey')
    }
  ])
}
