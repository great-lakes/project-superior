const { getSurveyData, createSurveySubmission } = require('../services/helper')
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
            delete session.conversationData.survey
            session.replaceDialog('isSatisfied')
          }

          const { hackathonId, surveyId, prize, surveyQuestions } = surveyObj
          session.conversationData.hackathonId = hackathonId
          session.conversationData.survey = {surveyId}

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
          session.conversationData.survey.surveyQuestions = [...registrationQuestions, ...surveyQuestions.sort(q => q.order)]
          session.conversationData.survey.surveyQuestionCount = 0
          session.conversationData.survey.surveyPrize = prize
          session.conversationData.survey.surveyResults = []
          // set takeSurvey flag so we do not advertise on endConvo
          session.conversationData.takeSurvey = true
          next()
        })
        .catch(() => {
          let message = "Sorry, I don't seem to remember the questions... Please come by the booth and chat with us to find out more."
          session.send(message)
          delete session.conversationData.survey
          session.replaceDialog('isSatisfied')
        })
    }, function (session, args, next) {
      // evaluate

      // check if all questions have been asked
      if (session.conversationData.survey.surveyQuestions.length === session.conversationData.survey.surveyQuestionCount) {
        // survey complete - submit to API
        const submitObj = {
          hackathonId: session.conversationData.hackathonId,
          surveyId: session.conversationData.survey.surveyId,
          studentName: session.conversationData.name,
          studentEmail: session.conversationData.email,
          data: session.conversationData.survey.surveyResults.slice(2)
        }
        createSurveySubmission(submitObj)
          .then(submitResult => {
            const status = submitResult.data.createSurveySubmission.result
            if (status === 'CREATED' || status === 'DUPLICATE') {
              let msgCard = new builder.Message(session)
              msgCard.attachments([
                new builder.HeroCard(session)
                  .title('Survey Complete: Thank You!')
                  .subtitle('Entered to win: ' + session.conversationData.survey.surveyPrize + '!')
                  .text('We will notify the winner via email after the hackathon - Good Luck!')
                  .images([builder.CardImage.create(session, 'https://greatlakesblob.blob.core.windows.net/hannabot/ninja-cat-min.jpg')])
              ])
              session.send(msgCard)
            }

            // remember to ask here since async dialog
            delete session.conversationData.survey
            session.replaceDialog('isSatisfied')
          })
      } else {
        next()
      }
    }, function (session, args, next) {
      // ask question
      const surveyQuestions = session.conversationData.survey.surveyQuestions
      const surveyQuestionCount = session.conversationData.survey.surveyQuestionCount
      const currentQuestion = surveyQuestions[surveyQuestionCount]

      // update questionId
      session.conversationData.survey.currentSurveyQuestionId = currentQuestion.id || null // null for first two (identification) questions

      if (currentQuestion.type === 'CHOICE') {
        // update choiceArray
        session.conversationData.survey.currentSurveyChoices = currentQuestion.survey_choices

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
      if (session.conversationData.survey.surveyQuestionCount === 0) {
        session.conversationData.name = args.response
      }

      // second question: email
      if (session.conversationData.survey.surveyQuestionCount === 1) {
        session.conversationData.email = args.response
      }

      // capture response
      if (args.response.entity) { // capture choice selected
        session.conversationData.survey.surveyResults[session.conversationData.survey.surveyQuestionCount] = {
          value: args.response.entity,
          surveyQuestionId: session.conversationData.survey.currentSurveyQuestionId,
          surveyChoiceId: session.conversationData.survey.currentSurveyChoices.find(choice => choice.value === args.response.entity).id
        }
      } else { // capture text entered
        session.conversationData.survey.surveyResults[session.conversationData.survey.surveyQuestionCount] = {
          value: args.response,
          surveyQuestionId: session.conversationData.survey.currentSurveyQuestionId,
          surveyChoiceId: null
        }
      }

      // increment count
      session.conversationData.survey.surveyQuestionCount++

      // recursive call
      session.replaceDialog('takeSurvey')
    }
  ])
}
