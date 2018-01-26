
exports.up = (db) => db.createTable('mentors', {
  id: {type: 'int', primaryKey: true, autoIncrement: true},
  first_name: 'string',
  last_name: 'string',
  bio: 'text',
  email: 'string',
  phone: 'string',
  is_available: 'boolean'
})

exports.down = (db) => db.dropTable('mentors')

exports._meta = {
  'version': 1
}
