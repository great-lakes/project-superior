
exports.up = (db) => db.createTable('technologies', {
  id: {type: 'int', primaryKey: true, autoIncrement: true},
  name: 'string'
})

exports.down = (db) => db.dropTable('technologies')

exports._meta = {
  'version': 1
}
