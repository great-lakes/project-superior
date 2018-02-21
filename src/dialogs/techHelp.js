const { getTechData } = require('../services/helper')
const builder = require('botbuilder')

module.exports = function (bot) {
  bot.dialog('techHelp', [
    function (session, args, next) {
      session.sendTyping()

      return getTechData()
      .then((result) => {
        session.conversationData.techData = result

        // check if luis identified
        let techEntity = builder.EntityRecognizer.findEntity(args.entities, 'technology')
        if (techEntity) {
          // luis entity exists, use this value
          let techResolution = techEntity.resolution.values[0]
          // same shape as arguments result from prompt choice
          next({ response: { entity: techResolution } })
        }

        if (!techEntity) {
          // no luis entity, prompt user choices
          builder.Prompts.choice(
            session,
            'I have info and docs on these technologies:',
            result.map(tech => tech.name)
          )
        }
      })
      .catch(() => {
        let message = "I'm sorry, I can't find any information on technical documents and examples.\n\n"
        message += 'Come by the booth to talk to the Microsoft mentors. They may be able to help you with your hack!'
        session.send(message)
        session.replaceDialog('isSatisfied')
      })
    },
    function (session, args, next) {
      // load data from conversationData
      let techData = session.conversationData.techData
      // find index of selected technology
      // important: luis entity should match db data
      const entity = args.response.entity.toLowerCase()
      let techIndex = techData.findIndex(element => element.name.toLowerCase() === entity)

      // display info to user
      let message = techData[techIndex].name + ':\n\n'
      message += techData[techIndex].help_text
      session.send(message)

      session.sendTyping()

      message = 'Check out these docs to get started and find more info:\n\n'
      message += techData[techIndex].doc_link
      session.send(message)

      session.sendTyping()

      session.send("I hope this helps. If not, feel free to come by the booth, or say, 'submit a question'.")

      // remember to ask here since async dialog
      session.replaceDialog('isSatisfied')
    }
  ])
}
