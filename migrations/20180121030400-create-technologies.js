const devSeedData = [
  'Azure',
  'Hololens',
  'Xamarin',
  '.NET Core'
]
exports.up = (db) => db.createTable('technologies', {
  id: {type: 'int', primaryKey: true, autoIncrement: true},
  name: 'string'
}).then(() => {
  if (process.env.ENV !== 'dev') {
    return
  }
  return Promise.all(devSeedData
    .map((data) => new Promise((resolve, reject) => {
      db.insert('technologies', ['name'], [
        data
      ], (error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  ))
})

exports.down = (db) => db.dropTable('technologies')

exports._meta = {
  'version': 1
}
