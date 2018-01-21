exports.up = (db) => db.createTable('azurecodes', {
  id: {type: 'int', primaryKey: true, autoIncrement: true},
  code: 'string',
  project_id: {
    type: 'int',
    notNull: false,
    foreignKey: {
      name: 'azurecodes_project_id_foreign',
      table: 'projects',
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
