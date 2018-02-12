const { createQuestion } = require('../services/helper')
const builder = require('botbuilder')

module.exports = function (bot) {
  bot.dialog('askQuestion', [
    function (session, args, next) {
      session.send('I need some information so the team knows how to get back to you.')

      // get name
      builder.Prompts.text(
        session,
        'What is your first name?'
      )
    },
    function (session, args, next) {
      session.conversationData.questionData = {}
      session.conversationData.questionData.name = args.response.entity

      // get email
      builder.Prompts.text(
        session,
        'What is the best email to get back to you?'
      )
    },
    function (session, args, next) {
      session.conversationData.questionData.email = args.response.entity

      // get question
      builder.Prompts.text(
        session,
        'What is your question?'
      )
    },
    function (session, args, next) {
      session.conversationData.questionData.question = args.response.entity

      let questionData = session.conversationData.questionData
      createQuestion(questionData)
      .then((result) => {
        if (result.errors) {
          // error
          session.send('Sorry, there seems to be a problem sending the question. Please come to the booth and ask us in person.')
        }

        let message = 'Okay great! We recorded your question and one of our mentors will get back to you soon.\n\n'
        message += '(Note: Unlike me, our mentors do require sleep. If they are not at the booth they will see you bright and early in the morning and answer any questions then!'
        session.send(message)

        // remember to ask here since async dialog
        session.replaceDialog('isSatisfied')
      })
    }
  ])
}
