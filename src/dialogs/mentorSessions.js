module.exports = function (bot) {
  bot.dialog('mentorSessions', [
    function (session, args, next) {
      session.send('Hello.. mentorSessions!')

      // remember to ask here since async dialog
      session.replaceDialog('isSatisfied')
    }
  ])
}
