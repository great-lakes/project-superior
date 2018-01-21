
exports.up = (db) =>
db.createTable('project_technology', {
  'project_id': {type: 'int', primaryKey: true},
  'technology_id': {type: 'int', primaryKey: true}
})
.then((result) => {
  db.addForeignKey('project_technology', 'projects', 'project_technology_project_id_foreign',
    {
      'project_id': 'id'
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
})
.then((result) => {
  db.addForeignKey('project_technology', 'technologies', 'project_technology_technology_id_foreign',
    {
      'technology_id': 'id'
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
})

exports.down = (db) => db.dropTable('project_technology')

exports._meta = {
  'version': 1
}
