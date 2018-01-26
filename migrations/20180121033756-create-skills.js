
exports.up = (db) => db.createTable('skills', {
  id: {type: 'int', primaryKey: true, autoIncrement: true},
  name: 'string'
})

exports.down = (db) => db.dropTable('skills')

exports._meta = {
  'version': 1
}
