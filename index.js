require('dotenv').config()
var restify = require('restify')
var builder = require('botbuilder')
var azure = require('botbuilder-azure')

// Require LUIS dialog router
const luisDialogRouter = require('./src/router/luisRouter')

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

server.get(/\/?.*/, restify.plugins.serveStatic({
  directory: './public',
  default: 'index.html'
}))

// Initializing universal bot using the connector with bot state using table storage
var bot = new builder.UniversalBot(connector).set('storage', tableStorage)

// Setup LUIS recognizer
var luisRecognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL)
var dialog = new builder.IntentDialog({recognizers: [luisRecognizer]})

// Register LUIS dialog router
luisDialogRouter(bot, dialog)

// Root dialog
bot.dialog('/', dialog)
