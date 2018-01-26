require('dotenv').config()
var restify = require('restify')
var builder = require('botbuilder')
var azure = require('botbuilder-azure')

// Require dialogs
const greetingDialog = require('./src/dialogs/greeting')
const azureCodeDialog = require('./src/dialogs/azureCode')

// Setup Restify Server
var server = restify.createServer({ name: 'HannaBot-Server' })
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s is listening to port %s', server.name, process.env.PORT || 3978)
})

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
})

// Table storage
var tableName = 'botStorage' // You define
var storageName = process.env.TABLE_STORAGE_NAME // Obtain from Azure Portal
var storageKey = process.env.TABLE_STORAGE_KEY // Obtain from Azure Portal

var azureTableClient = new azure.AzureTableClient(tableName, storageName, storageKey)
var tableStorage = new azure.AzureBotStorage({gzipData: false}, azureTableClient)

// Listen for messages from users
server.post('/api/messages', connector.listen())

server.get(/\/?.*/, restify.serveStatic({
  directory: './public',
  default: 'index.html'
}))

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector).set('storage', tableStorage)

// Register dialogs
greetingDialog(bot)
azureCodeDialog(bot)

bot.dialog('/', [
  function (session, args, next) {
    session.sendTyping()
    session.send('hello world')
    session.beginDialog('greeting')
    session.beginDialog('azureCode')
  }
])
