const {dataSeederInserts} = require('../support/migrationHelper')

exports.up = (db) => db.createTable('azurecodes', {
  id: {type: 'int', primaryKey: true, autoIncrement: true},
  code: 'string',
  expires_on: 'date',
  project_id: {
    type: 'int',
    notNull: false,
    foreignKey: {
      name: 'azurecodes_project_id_foreign',
      table: 'projects',
      rules: {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      mapping: 'id'
    }},
  hackathon_id: {
    type: 'int',
    notNull: true,
    foreignKey: {
      name: 'azurecodes_hackathon_id_foreign',
      table: 'hackathons',
      rules: {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      mapping: 'id'
    }}
}).then(() => {
  if (process.env.ENV !== 'dev') {
    return
  }
  const dbName = 'azurecodes'
  const columns = ['code', 'expires_on', 'project_id', 'hackathon_id']
  const devSeedData = [
    ['abc', '2018-03-01', 1, 1]
    // ['def', '2018-03-01', null, 1],
    // ['ghi', '2018-03-01', null, 1]
  ]
  return dataSeederInserts(db, dbName, columns, devSeedData)
})

exports.down = (db) => db.dropTable('azurecodes')

exports._meta = {
  'version': 1
}
