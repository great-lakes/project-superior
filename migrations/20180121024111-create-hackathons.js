
exports.up = (db) => db.createTable('hackathons', {
  id: {type: 'int', primaryKey: true, autoIncrement: true},
  name: 'string',
  description: 'text',
  start_date: 'date',
  end_date: 'date',
  bot_deployed: 'string'
})

exports.down = (db) => db.dropTable('hackathons')

exports._meta = {
  'version': 1
}
