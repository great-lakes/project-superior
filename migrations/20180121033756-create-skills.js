const {dataSeederInserts} = require('../support/migrationHelper')

exports.up = (db) => db.createTable('skills', {
  id: {type: 'int', primaryKey: true, autoIncrement: true},
  name: 'string'
}).then(() => {
  if (process.env.ENV !== 'dev') {
    return
  }
  const dbName = 'skills'
  const columns = ['name']
  const devSeedData = [
    ['Javascript'],
    ['React'],
    ['Mobile'],
    ['Python'],
    ['Hololens'],
    ['.NET Core'],
    ['Iot'],
    ['Bots'],
    ['AI/ML'],
    ['Tensorflow']
  ]
  return dataSeederInserts(db, dbName, columns, devSeedData)
})

exports.down = (db) => db.dropTable('skills')

exports._meta = {
  'version': 1
}
