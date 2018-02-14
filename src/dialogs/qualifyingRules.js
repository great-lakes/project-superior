const { getCompetitionData } = require('../services/helper')

module.exports = function (bot) {
  bot.dialog('qualifyingRules', [
    function (session, args, next) {
      return getCompetitionData()
      .then((result) => {
        // description
        session.send(result.hack_text)

        // qualifying tech
        let message = 'Winning hack prize: ' + result.prize_text
        session.sendTyping()
        session.send(message)

        // prizes
        message = 'Qualifying Technology: ' + result.qualifyingTech_text
        session.sendTyping()
        session.send(message)

        // remember to ask here since async dialog
        session.replaceDialog('isSatisfied')
      })
      .catch(() => {
        let message = "Sorry, I don't remember this info. Please come by the booth to find out more about the prizes and qualifying Microsoft tech."
        session.send(message)
        session.replaceDialog('isSatisfied')
      })
    }
  ])
}
