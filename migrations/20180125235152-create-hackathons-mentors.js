const {dataSeederInserts} = require('../support/migrationHelper')

exports.up = (db) =>
db.createTable('hackathons_mentors', {
  'hackathon_id': {type: 'int', primaryKey: true},
  'mentor_id': {type: 'int', primaryKey: true}
})
.then((result) => {
  db.addForeignKey('hackathons_mentors', 'hackathons', 'hackathons_mentors_hackathon_id_foreign',
    {
      'hackathon_id': 'id'
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
})
.then((result) => {
  db.addForeignKey('hackathons_mentors', 'mentors', 'hackathons_mentors_mentor_id_foreign',
    {
      'mentor_id': 'id'
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
}).then(() => {
  if (process.env.ENV !== 'dev') {
    return
  }
  const dbName = 'hackathons_mentors'
  const columns = ['mentor_id', 'hackathon_id']
  const devSeedData = [
    [1, 1]
  ]
  return dataSeederInserts(db, dbName, columns, devSeedData)
})

exports.down = (db) => db.dropTable('hackathons_mentors')

exports._meta = {
  'version': 1
}
