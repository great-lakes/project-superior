exports.up = (db) => db.createTable('projects', {
  id: {type: 'int', primaryKey: true, autoIncrement: true},
  name: 'string',
  description: 'text',
  created_at: 'timestamp',
  updated_at: 'timestamp'
})

exports.down = (db) => db.dropTable('projects')

exports._meta = {
  'version': 1
}
