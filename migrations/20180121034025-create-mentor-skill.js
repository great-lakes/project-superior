exports.up = (db) =>
db.createTable('mentor_skill', {
  'mentor_id': {type: 'int', primaryKey: true},
  'skill_id': {type: 'int', primaryKey: true}
})
.then((result) => {
  db.addForeignKey('mentor_skill', 'mentors', 'mentor_skill_mentor_id_foreign',
    {
      'mentor_id': 'id'
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
})
.then((result) => {
  db.addForeignKey('mentor_skill', 'skills', 'mentor_skill_skill_id_foreign',
    {
      'skill_id': 'id'
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
})

exports.down = (db) => db.dropTable('mentor_skill')

exports._meta = {
  'version': 1
}
