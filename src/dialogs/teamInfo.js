const { getTeamData } = require('../services/helper')
const builder = require('botbuilder')

module.exports = function (bot) {
  bot.dialog('teamInfo', [
    function (session, args, next) {
      return getTeamData()
      .then((result) => {
        session.conversationData.teamData = result

        session.send('Our team of Microsoft hackers and mentors are ready to help and answer any questions you may have. From questions to our technology, to architecting and implementing your hack let us know how we can help!')

        builder.Prompts.choice(
          session,
          'Who would you like to know more about?',
          result.map(mentor => mentor.name)
        )
      })
    },
    function (session, args, next) {
      let teamData = session.conversationData.teamData
      let teamindex = teamData.findIndex((element) => {
        return (element.name.toLowerCase() === args.response.entity.toLowerCase())
      })

      // Skills
      let message = teamData[teamindex].name + "'s skills include: "
      teamData[teamindex].skills.forEach(skill => {
        message += skill + ', '
      })
      // remove trailing ', '
      message = message.slice(0, -2)
      session.send(message)

      // Bio
      message = 'Short Bio:\n\n'
      message += teamData[teamindex].bio + '\n\n'
      message += 'The entire team will be around all weekend hacking, make sure to chat with us!'
      session.send(message)

      // remember to ask here since async dialog
      session.replaceDialog('isSatisfied')
    }
  ])
}
