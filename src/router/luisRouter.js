module.exports = function (bot, dialog) {
  // Require and Register dialogs
  require('../dialogs/greeting')(bot)
  // require('../dialogs/botHelp')(bot)
  // require('../dialogs/teamInfo')(bot)
  // require('../dialogs/techHelp')(bot)
  require('../dialogs/azureCode')(bot)
  // require('../dialogs/azureCodeError')(bot)
  // require('../dialogs/negativeComment')(bot)
  // require('../dialogs/profanity')(bot)
  // require('../dialogs/endConvo')(bot)

  dialog.matches('greeting', [
    function (session, args, next) {
      session.send('greeting')
      session.beginDialog('greeting', args)
    }
  ])

  dialog.matches('botHelp', [
    function (session, args, next) {
      session.send('botHelp')
    }
  ])

  dialog.matches('teamInfo', [
    function (session, args, next) {
      session.send('teamInfo')
    }
  ])

  dialog.matches('techHelp', [
    function (session, args, next) {
      session.send('techHelp')
    }
  ])

  dialog.matches('azureCode', [
    function (session, args, next) {
      session.send('azureCode')
      session.beginDialog('azureCode', args)
    }
  ])

  dialog.matches('azureCodeError', [
    function (session, args, next) {
      session.send('azureCodeError')
    }
  ])

  dialog.matches('negativeComment', [
    function (session, args, next) {
      session.send('negativeComment')
    }
  ])

  dialog.matches('profanity', [
    function (session, args, next) {
      session.send('profanity')
    }
  ])

  dialog.matches('endConvo', [
    function (session, args, next) {
      session.send('endConvo')
    }
  ])
}
