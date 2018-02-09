module.exports = function (bot, dialog) {
  // Require and Register dialogs
  require('../dialogs/greeting')(bot) // done
  require('../dialogs/botHelp')(bot) // done
  require('../dialogs/askQuestion')(bot)
  require('../dialogs/teamInfo')(bot)
  require('../dialogs/techHelp')(bot)
  require('../dialogs/azureCode')(bot) // TODO: Gabby
  require('../dialogs/azureCodeError')(bot) // TODO: Gabby
  require('../dialogs/showSurvey')(bot) // done
  require('../dialogs/qualifyingRules')(bot)
  require('../dialogs/negativeComment')(bot) // done
  require('../dialogs/profanity')(bot) // done
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

  dialog.matches('showSurvey', [
    function (session, args, next) {
      session.beginDialog('showSurvey', args)
      session.beginDialog('isSatisfied', args)
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
