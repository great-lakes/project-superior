exports.up = (db) => db.addColumn('projects', 'hackathon_id', {
  type: 'int'
})
.then((result) => {
  db.addForeignKey('projects', 'hackathons', 'projects_hackathon_id_foreign',
    {
      'hackathon_id': 'id'
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
})

exports.down = (db) => db.removeColumn('projects', 'hackathon_id')

exports._meta = {
  'version': 1
}
