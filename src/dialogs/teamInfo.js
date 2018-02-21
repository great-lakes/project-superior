const { getTeamData } = require('../services/helper')
const builder = require('botbuilder')

module.exports = function (bot) {
  bot.dialog('teamInfo', [
    function (session, args, next) {
      return getTeamData()
      .then((result) => {
        session.conversationData.teamData = result

        session.send('Our team of Microsoft hackers and mentors are ready to help and answer any questions you may have. From questions about our technology to architecting and implementing your hack, let us know how we can help!')

        builder.Prompts.choice(
          session,
          'Who would you like to know more about?',
          result.map(mentor => mentor.name)
        )
      })
      .catch(() => {
        let message = 'Our team of Microsoft hackers and mentors are ready to help and answer any questions you may have. From questions about our technology to architecting and implementing your hack, let us know how we can help!\n\n'
        message += "Unfortunately I'm having trouble finding information on the team. Come stop by the booth and meet them in person!"
        session.send(message)
        session.replaceDialog('isSatisfied')
      })
    },
    function (session, args, next) {
      let teamData = session.conversationData.teamData
      let teamindex = teamData.findIndex(element => element.name === args.response.entity)

      // Skills
      let message = teamData[teamindex].name + "'s skills include: "
      message += teamData[teamindex].skills.map(_ => _.name).join(', ')
      session.send(message)

      // Bio
      message = 'Short Bio:\n\n'
      message += teamData[teamindex].bio + '\n\n'
      message += 'The entire team will be around all weekend hacking, so make sure to chat with us!'
      session.send(message)

      // remember to ask here since async dialog
      session.replaceDialog('isSatisfied')
    }
  ])
}
