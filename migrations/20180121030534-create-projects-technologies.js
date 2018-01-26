const {dataSeederInserts} = require('../support/migrationHelper')
exports.up = (db) =>
db.createTable('projects_technologies', {
  'project_id': {type: 'int', primaryKey: true},
  'technology_id': {type: 'int', primaryKey: true}
})
.then((result) => {
  db.addForeignKey('projects_technologies', 'projects', 'projects_technologies_project_id_foreign',
    {
      'project_id': 'id'
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
})
.then((result) => {
  db.addForeignKey('projects_technologies', 'technologies', 'projects_technologies_technology_id_foreign',
    {
      'technology_id': 'id'
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
}).then(() => {
  if (process.env.ENV !== 'dev') {
    return
  }

  const dbName = 'projects_technologies'
  const columns = ['project_id', 'technology_id']
  const devSeedData = [
    [1, 1],
    [1, 2],
    [1, 4]
  ]

  return dataSeederInserts(db, dbName, columns, devSeedData)
})
exports.down = (db) => db.dropTable('projects_technologies')

exports._meta = {
  'version': 1
}
