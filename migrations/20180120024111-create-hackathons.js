const {dataSeederInserts} = require('../support/migrationHelper')
exports.up = (db) => db.createTable('hackathons', {
  id: {type: 'int', primaryKey: true, autoIncrement: true},
  name: 'string',
  description: 'text',
  start_date: 'date',
  end_date: 'date',
  bot_deployed: 'string'
}).then(() => {
  if (process.env.ENV !== 'dev') {
    return
  }

  const dbName = 'hackathons'
  const columns = ['name', 'description', 'start_date', 'end_date']
  const devSeedData = [
    [
      'HackIllinois 2018',
      'The hackathon that takes place in Urbana, IL at University of Illinois Campus',
      '2018-02-23',
      '2018-02-25'
    ]
  ]

  return dataSeederInserts(db, dbName, columns, devSeedData)
})

exports.down = (db) => db.dropTable('hackathons')

exports._meta = {
  'version': 1
}
