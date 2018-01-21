exports.up = (db) => db.createTable('inquiries', {
  id: {type: 'int', primaryKey: true, autoIncrement: true},
  created_at: 'timestamp',
  updated_at: 'timestamp',
  question: 'text',
  mentor_notes: 'text',
  is_resolved: 'boolean',
  student_id: {
    type: 'int',
    notNull: true,
    foreignKey: {
      name: 'inquiries_student_id_foreign',
      table: 'students',
      rules: {
        onDelete: 'CASCADE',
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
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      mapping: 'id'
    }}
})

exports.down = (db) => db.dropTable('inquiries')

exports._meta = {
  'version': 1
}
