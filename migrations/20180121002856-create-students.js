const {dataSeederInserts} = require('../support/migrationHelper')
exports.up = (db) => db.createTable('students', {
  id: {type: 'int', primaryKey: true, autoIncrement: true},
  name: {type: 'string', notNull: false},
  email: {type: 'string', notNull: false},
  phone: {type: 'string', notNull: false},
  created_at: 'timestamp',
  updated_at: 'timestamp',
  project_id: {
    type: 'int',
    notNull: false,
    foreignKey: {
      name: 'students_project_id_foreign',
      table: 'projects',
      rules: {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      mapping: 'id'
    }}
}).then(() => {
  if (process.env.ENV !== 'dev') {
    return
  }

  const dbName = 'students'
  const columns = ['name', 'email', 'phone', 'created_at', 'updated_at', 'project_id']
  const devSeedData = [
    [
      'Joe Bob',
      'joebobby@example.com',
      '123-555-1234',
      new Date().toISOString(),
      new Date().toISOString(),
      1
    ]
  ]

  return dataSeederInserts(db, dbName, columns, devSeedData)
})

exports.down = (db) => db.dropTable('students')

exports._meta = {
  'version': 1
}
