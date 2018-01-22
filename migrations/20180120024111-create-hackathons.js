
exports.up = (db) => db.createTable('hackathons', {
  id: {type: 'int', primaryKey: true, autoIncrement: true},
  name: 'string',
  description: 'text',
  start_date: 'date',
  end_date: 'date',
  bot_deployed: 'string'
}).then(() => {
  if (process.env.ENV !== 'dev') {
    return
  }
  return new Promise((resolve, reject) => {
    db.insert('hackathons', ['name', 'description', 'start_date', 'end_date'], [
      'HackIllinois 2018',
      'The hackathon that takes place in Urbana, IL at University of Illinois Campus',
      '2018-02-23',
      '2018-02-25'
    ], (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
})

exports.down = (db) => db.dropTable('hackathons')

exports._meta = {
  'version': 1
}
