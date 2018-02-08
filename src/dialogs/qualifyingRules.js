module.exports = function (bot) {
  bot.dialog('qualifyingRules', [
    function (session, args, next) {
      session.send('Hello, you are in qualifyingRules dialog!')
      // rules
      // prizes
      session.endDialog()
    }
  ])
}
