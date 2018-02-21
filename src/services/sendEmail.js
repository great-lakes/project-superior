var nodemailer = require('nodemailer')
var sparkPostTransport = require('nodemailer-sparkpost-transport')
var transporter = nodemailer.createTransport(sparkPostTransport())

// send mail with defined transport object
exports.sendMail = function (email, code, surveyLink, surveyPrize) {
  var mailOptions = {
    from: `"Microsoft Hanna Bot " <${process.env.FROM_EMAIL}>`, // sender address
    to: email, // list of receivers
    subject: 'Your Azure Code', // Subject line
    text: 'Hello fellow hacker! code: ' + code, // plaintext body
    html: '<p>Hello fellow hacker!<p><p>Thank you for signing up for an Azure Code! We hope that our services can truly help you with your project. Here is your Azure code: </p><p> <b>' + code + '</b></p><p> To activate: Go to https://www.microsoftazurepass.com/ and paste in this code</p><p> Please come by the booth if you have any questions and dont forget to fill out our survey at ' + surveyLink + ' for a chance to win ' + surveyPrize + '!</p></br><p><h3>Microsoft Evangelism Team</h3></p><p> </p><p>E: usdxmsfthack@outlook.com</p>' // html body
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent')
  })
}
