module.exports = function (bot) {
    bot.dialog('profanity', [
      function (session, args, next) {
        session.send('~profanity intent~ Hey, watch it!')
        session.endDialog()
      }
    ])
  }