const phrasesArr = [
  "That's not nice, if you need help, ask me for a 'main menu' or 'Hanna help'.",
  "Let's try to be polite!",
  "I'm trying to help you. Come by the booth for more assistance.",
  'Hey! Not nice. Try asking my a question nicely.',
  'I have feelings, too, you know...',
  'That hurts! Can we be nice to each other?',
  "I want to help you! Please don't be mean!",
  'Sorry, I can only help if you are nice.'
]

module.exports = function (bot) {
  bot.dialog('profanity', [
    function (session, args, next) {
      let message = phrasesArr[Math.floor(Math.random() * phrasesArr.length)]
      session.send(message)
      session.endDialog()
    }
  ])
}
