const {dataSeederInserts} = require('../support/migrationHelper')

exports.up = (db) =>
db.createTable('mentors_skills', {
  'mentor_id': {type: 'int', primaryKey: true},
  'skill_id': {type: 'int', primaryKey: true}
})
.then((result) => {
  db.addForeignKey('mentors_skills', 'mentors', 'mentors_skills_mentor_id_foreign',
    {
      'mentor_id': 'id'
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
})
.then((result) => {
  db.addForeignKey('mentors_skills', 'skills', 'mentors_skills_skill_id_foreign',
    {
      'skill_id': 'id'
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
}).then(() => {
  if (process.env.ENV !== 'dev') {
    return
  }
  const dbName = 'mentors_skills'
  const columns = ['mentor_id', 'skill_id']
  const devSeedData = [
    [1, 1],
    [1, 2],
    [1, 4]
  ]
  return dataSeederInserts(db, dbName, columns, devSeedData)
})

exports.down = (db) => db.dropTable('mentors_skills')

exports._meta = {
  'version': 1
}
