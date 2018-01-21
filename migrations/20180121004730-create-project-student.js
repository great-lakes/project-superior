
exports.up = (db) =>
  db.createTable('project_student', {
    'project_id': {type: 'int', primaryKey: true},
    'student_id': {type: 'int', primaryKey: true}
  })
  .then((result) => {
    db.addForeignKey('project_student', 'projects', 'project_student_project_id_foreign',
      {
        'project_id': 'id'
      },
      {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
  })
  .then((result) => {
    db.addForeignKey('project_student', 'students', 'project_student_student_id_foreign',
      {
        'student_id': 'id'
      },
      {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
  })

exports.down = (db) => db.dropTable('project_student')

exports._meta = {
  'version': 1
}
