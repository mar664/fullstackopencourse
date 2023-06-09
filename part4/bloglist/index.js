const config = require('./utils/config')
const app = require('./app')
const db = require('./db')

db().then(() => {
  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
  })
})

