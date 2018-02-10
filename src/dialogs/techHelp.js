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
    },
    function (session, args, next) {
      // load data from conversationData
      let techData = session.conversationData.techData
      // find index of selected technology
      // important: luis entity should match db data
      let techIndex = techData.findIndex((element) => {
        return (element.name.toLowerCase() === args.response.entity.toLowerCase())
      })

      // display info to user
      let message = techData[techIndex].name + ':\n\n'
      message += techData[techIndex].help_text
      session.send(message)

      session.sendTyping()

      message = 'Check out these docs to get started and find more info:\n\n'
      message += techData[techIndex].doc_link
      session.send(message)

      session.sendTyping()

      session.send("I hope this helps, if not feel free to come by the booth or say 'submit a question'")

      // remember to ask here since async dialog
      session.replaceDialog('isSatisfied')
    }
  ])
}
