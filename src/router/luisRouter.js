module.exports = function (bot, dialog) {
  // Require and Register dialogs
  require('../dialogs/greeting')(bot)
  require('../dialogs/botHelp')(bot)
  require('../dialogs/askQuestion')(bot)
  require('../dialogs/teamInfo')(bot)
  require('../dialogs/techHelp')(bot)
  require('../dialogs/azureCode')(bot) // TODO: Gabby: implementation
  require('../dialogs/azureCodeError')(bot) // TODO: Gabby: implementation
  require('../dialogs/showSurvey')(bot)
  require('../dialogs/qualifyingRules')(bot)
  require('../dialogs/careers')(bot) // TODO: implementation
  require('../dialogs/mentorSessions')(bot) // TODO: implementation
  require('../dialogs/negativeComment')(bot)
  require('../dialogs/profanity')(bot)
  require('../dialogs/praise')(bot)
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
    }
  ])

  dialog.matches('askQuestion', [
    function (session, args, next) {
      session.beginDialog('askQuestion', args)
    }
  ])

  dialog.matches('teamInfo', [
    function (session, args, next) {
      session.beginDialog('teamInfo', args)
    }
  ])

  dialog.matches('techHelp', [
    function (session, args, next) {
      session.beginDialog('techHelp', args)
    }
  ])

  dialog.matches('azureCode', [
    function (session, args, next) {
      session.beginDialog('azureCode', args)
    }
  ])

  dialog.matches('azureCodeError', [
    function (session, args, next) {
      session.beginDialog('azureCodeError', args)
      session.beginDialog('isSatisfied', args)
    }
  ])

  dialog.matches('showSurvey', [
    function (session, args, next) {
      session.beginDialog('showSurvey', args)
    }
  ])

  dialog.matches('qualifyingRules', [
    function (session, args, next) {
      session.beginDialog('qualifyingRules', args)
    }
  ])

  dialog.matches('careers', [
    function (session, args, next) {
      session.beginDialog('careers', args)
    }
  ])

  dialog.matches('mentorSessions', [
    function (session, args, next) {
      session.beginDialog('mentorSessions', args)
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

  dialog.matches('praise', [
    function (session, args, next) {
      session.beginDialog('praise', args)
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
