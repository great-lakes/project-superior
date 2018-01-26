exports.up = (db) => db.createTable('azurecodes', {
  id: {type: 'int', primaryKey: true, autoIncrement: true},
  code: 'string',
  expires_on: 'date',
  project_id: {
    type: 'int',
    notNull: false,
    foreignKey: {
      name: 'azurecodes_project_id_foreign',
      table: 'projects',
      rules: {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      mapping: 'id'
    }},
  hackathon_id: {
    type: 'int',
    notNull: true,
    foreignKey: {
      name: 'azurecodes_hackathon_id_foreign',
      table: 'hackathons',
      rules: {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      mapping: 'id'
    }}
})

exports.down = (db) => db.dropTable('azurecodes')

exports._meta = {
  'version': 1
}
