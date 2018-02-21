const phrasesArr = [
  "I'm sorry. If you need help, ask me for a 'main menu' or 'Hanna help'.",
  "I'm trying to help you. Come by the booth for more assistance.",
  "I want to help you, please don't be mean!",
  'Sorry, I am doing my best. Trying asking me again or come by the booth to chat.',
  "I am doing my best, ask to see the 'main menu' or say 'Hanna help'."
]

module.exports = function (bot) {
  bot.dialog('negativeComment', [
    function (session, args, next) {
      let message = phrasesArr[Math.floor(Math.random() * phrasesArr.length)]
      session.send(message)
      session.endDialog()
    }
  ])
}
