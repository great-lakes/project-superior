module.exports = function (bot, dialog) {
  // Require and Register dialogs
  require('../dialogs/greeting')(bot)
  require('../dialogs/botHelp')(bot)
  require('../dialogs/askQuestion')(bot)
  require('../dialogs/teamInfo')(bot)
  require('../dialogs/techHelp')(bot)
  require('../dialogs/azureCode')(bot)
  require('../dialogs/azureCodeError')(bot)
  require('../dialogs/negativeComment')(bot)
  require('../dialogs/profanity')(bot)
  require('../dialogs/endConvo')(bot)
  require('../dialogs/isSatisfied')(bot)
  require('../dialogs/mainMenu')(bot)

  dialog.matches('greeting', [
    function (session, args, next) {
      session.beginDialog('greeting', args)
    }
  ])

  dialog.matches('botHelp', [
    function (session, args, next) {
      session.beginDialog('botHelp', args)
      // Here's what I can do..
      // Some examples...
      session.beginDialog('mainMenu', args)
    }
  ])

  dialog.matches('askQuestion', [
    function (session, args, next) {
      session.beginDialog('askQuestion', args)
      session.beginDialog('isSatisfied', args)
    }
  ])

  dialog.matches('teamInfo', [
    function (session, args, next) {
      session.beginDialog('teamInfo', args)
      session.beginDialog('isSatisfied', args)
    }
  ])

  dialog.matches('techHelp', [
    function (session, args, next) {
      session.beginDialog('techHelp', args)
      session.beginDialog('isSatisfied', args)
    }
  ])

  dialog.matches('azureCode', [
    function (session, args, next) {
      session.beginDialog('azureCode', args)
      session.beginDialog('isSatisfied', args)
    }
  ])

  dialog.matches('azureCodeError', [
    function (session, args, next) {
      session.beginDialog('azureCodeError', args)
      session.beginDialog('isSatisfied', args)
    }
  ])

  dialog.matches('negativeComment', [
    function (session, args, next) {
      session.beginDialog('negativeComment', args)
    }
  ])

  dialog.matches('profanity', [
    function (session, args, next) {
      session.beginDialog('profanity', args)
    }
  ])

  dialog.matches('endConvo', [
    function (session, args, next) {
      session.beginDialog('endConvo', args)
    }
  ])

  dialog.onDefault([
    function (session, args, next) {
      // Show user main menu since no other intents identified
      session.beginDialog('mainMenu')
    }
  ])
}
