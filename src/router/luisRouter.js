module.exports = function (bot, dialog) {
  // Require and Register dialogs
  require('../dialogs/greeting')(bot) // done
  require('../dialogs/botHelp')(bot) // done
  require('../dialogs/askQuestion')(bot) // TODO:Kevin
  require('../dialogs/teamInfo')(bot) // TODO:Kevin
  require('../dialogs/techHelp')(bot) // done
  require('../dialogs/azureCode')(bot) // TODO: Gabby
  require('../dialogs/azureCodeError')(bot) // TODO: Gabby
  require('../dialogs/showSurvey')(bot) // done
  require('../dialogs/qualifyingRules')(bot) // TODO:Kevin
  require('../dialogs/negativeComment')(bot) // done
  require('../dialogs/profanity')(bot) // done
  require('../dialogs/praise')(bot)  // done
  require('../dialogs/endConvo')(bot) // done
  require('../dialogs/isSatisfied')(bot) // done
  require('../dialogs/mainMenu')(bot) // done

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
