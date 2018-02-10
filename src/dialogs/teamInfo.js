const { getTeamData } = require('../services/helper')
const builder = require('botbuilder')

module.exports = function (bot) {
  bot.dialog('teamInfo', [
    function (session, args, next) {
      return getTeamData()
      .then((result) => {
        session.conversationData.teamData = result

        session.send('TODO: About the hack mentor team')

        builder.Prompts.choice(
          session,
          'Who would you like to know more about?',
          result.map(mentor => mentor.name)
        )
      })
    },
    function (session, args, next) {
      session.send(args.response.entity)
      // remember to ask here since async dialog
      session.replaceDialog('isSatisfied')
    }
  ])
}
