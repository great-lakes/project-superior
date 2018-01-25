
require('dotenv').config()
var restify = require('restify')
var builder = require('botbuilder')
var azure = require('botbuilder-azure')

// Setup Restify Server
var server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s listening to %s', server.name, server.url)
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

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector).set('storage', tableStorage)

bot.dialog('/', [
  function (session, args, next) {
    session.send('hello world')
  }
])
