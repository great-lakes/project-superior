module.exports = function (bot) {
    bot.dialog('negativeComment', [
      function (session, args, next) {
        session.send("~negativeComment intent~ I'm sorry. If you come by the Microsoft booth, we can help you out in person!")
        session.endDialog()
      }
    ])
  }