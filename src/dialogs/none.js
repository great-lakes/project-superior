module.exports = function (bot) {
    bot.dialog('none', [
      function (session, args, next) {
        session.send("~none intent~ I'm sorry, I didn't understand that.")
        session.endDialog()
      }
    ])
  } 