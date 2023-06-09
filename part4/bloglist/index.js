const config = require('./utils/config')
const app = require('./app')
const { connect } = require('./db')

connect().then(() => {
  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
  })
})

