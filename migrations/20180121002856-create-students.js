
exports.up = (db) => db.createTable('students', {
  id: {type: 'int', primaryKey: true, autoIncrement: true},
  name: 'string',
  email: 'string',
  phone: 'string',
  created_at: 'timestamp',
  updated_at: 'timestamp'
})

exports.down = (db) => db.dropTable('students')

exports._meta = {
  'version': 1
}
