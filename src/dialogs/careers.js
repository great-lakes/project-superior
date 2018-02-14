module.exports = function (bot) {
  bot.dialog('career', [
    function (session, args, next) {
      session.send('Hello, I can help you with careers at Microsoft!')

      // remember to ask here since async dialog
      session.replaceDialog('isSatisfied')
    }
  ])
}
