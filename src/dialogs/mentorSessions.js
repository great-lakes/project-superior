const {getSessionData} = require('../services/helper')

module.exports = function (bot) {
  bot.dialog('mentorSessions', [
    function (session, args, next) {
      return getSessionData().then((sessions) => {
        session.send('Here is the info I have:')
        sessions.forEach((sesh) => {
          session.send(`${sesh.name} - ${sesh.description} 
${sesh.day}
${sesh.time} 
${sesh.place}`)
        })
        session.replaceDialog('isSatisfied')
      })
      // remember to ask here since async dialog
    }
  ])
}
