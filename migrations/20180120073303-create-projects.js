exports.up = (db) => db.createTable('projects', {
  id: {type: 'int', primaryKey: true, autoIncrement: true},
  name: 'string',
  description: 'text',
  created_at: 'timestamp',
  updated_at: {type: 'timestamp', notNull: false},
  hackathon_id: {
    type: 'int',
    notNull: true,
    foreignKey: {
      name: 'projects_hackathon_id_foreign',
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
  return new Promise((resolve, reject) => {
    db.insert('projects', ['name', 'description', 'created_at', 'updated_at', 'hackathon_id'], [
      'Fire Fighting Robot',
      'A robot that will find a water source, and seek out fires to put out',
      new Date().toISOString(),
      new Date().toISOString(),
      1
    ], (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
})

exports.down = (db) => db.dropTable('projects')

exports._meta = {
  'version': 1
}
