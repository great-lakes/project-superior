module.exports = function (bot) {
  bot.dialog('career', [
    function (session, args, next) {
      session.send('So, you want to begin a career with Microsoft? Excellent choice! From internships to fulltime positions, visit https://careers.microsoft.com/ for more information on programs and opportunities for students.')
      session.sendTyping()
      session.send('Please visit and apply online: https://careers.microsoft.com/students/apply')

      // remember to ask here since async dialog
      session.replaceDialog('isSatisfied')
    }
  ])
}
