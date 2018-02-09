const phrasesArr = [
  'You got it! Happy to help.',
  'Let me know if I can do anything else for you!',
  'Happy to help!',
  'Glad I could assist you!'
]

module.exports = function (bot) {
  bot.dialog('praise', [
    function (session, args, next) {
      let message = phrasesArr[Math.floor(Math.random() * phrasesArr.length)]
      session.send(message)
      session.endDialog()
    }
  ])
}
