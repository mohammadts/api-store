import mongoose from 'mongoose'

async function connect() {
  const uri =
    ''
  mongoose.set('strictQuery', true)
  return await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

export { connect }



