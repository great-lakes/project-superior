
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
})

exports.down = (db) => db.dropTable('students')

exports._meta = {
  'version': 1
}
