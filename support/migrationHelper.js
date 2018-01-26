exports.dataSeederInserts = (db, dbName, columns, seedData) => Promise.all(seedData
  .map((data) => new Promise((resolve, reject) => {
    db.insert(dbName, columns,
      data
    , (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
))
