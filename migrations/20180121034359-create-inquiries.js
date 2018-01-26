const {dataSeederInserts} = require('../support/migrationHelper')

exports.up = (db) => db.createTable('inquiries', {
  id: {type: 'int', primaryKey: true, autoIncrement: true},
  created_at: 'timestamp',
  updated_at: 'timestamp',
  question: 'text',
  mentor_notes: 'text',
  is_resolved: 'boolean',
  student_id: {
    type: 'int',
    notNull: false,
    foreignKey: {
      name: 'inquiries_student_id_foreign',
      table: 'students',
      rules: {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      mapping: 'id'
    }},
  mentor_id: {
    type: 'int',
    notNull: false,
    foreignKey: {
      name: 'inquiries_mentor_id_foreign',
      table: 'mentors',
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
  const dbName = 'inquiries'
  const columns = ['created_at', 'updated_at', 'question', 'mentor_notes', 'is_resolved', 'student_id', 'mentor_id']
  const devSeedData = [
    [ new Date().toISOString(), new Date().toISOString(), 'How do I use React?', 'Student needed to install nodejs', true, 1, 1 ]
  ]
  return dataSeederInserts(db, dbName, columns, devSeedData)
})

exports.down = (db) => db.dropTable('inquiries')

exports._meta = {
  'version': 1
}
