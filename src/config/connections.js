require('dotenv').config({ path: '.env' })
const mongoose = require('mongoose')

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION, {
      useUnifiedTopology: true,
      socketTimeoutMS: 0,
      keepAlive: true,
      useNewUrlParser: true
    })

    console.log('DB conectada')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = connection