const {dataSeederInserts} = require('../support/migrationHelper')

exports.up = (db) => db.createTable('mentors', {
  id: {type: 'int', primaryKey: true, autoIncrement: true},
  first_name: 'string',
  last_name: 'string',
  bio: 'text',
  email: 'string',
  phone: 'string',
  is_available: 'boolean'
}).then(() => {
  if (process.env.ENV !== 'dev') {
    return
  }
  const dbName = 'mentors'
  const columns = ['first_name', 'last_name', 'bio', 'email', 'phone', 'is_available']
  const devSeedData = [
    ['Hao', 'Luo', 'He loves Javascript and the web', 'test@example.com', '234-555-1293', true]
  ]
  return dataSeederInserts(db, dbName, columns, devSeedData)
})

exports.down = (db) => db.dropTable('mentors')

exports._meta = {
  'version': 1
}
