
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
})

exports.down = (db) => db.dropTable('projects_technologies')

exports._meta = {
  'version': 1
}
