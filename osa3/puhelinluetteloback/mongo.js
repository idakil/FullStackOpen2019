const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://dbuser:${password}@cluster0-d4poj.mongodb.net/phone_db?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)
const generateRandomId = () => {
  const randId = Math.floor((Math.random() * 99999) + 1)
  return randId
}
const person = new Person({
  name: name,
  number: number,
  id: generateRandomId(),
})

Person.find({}).then(res => {
  res.forEach(p => {
    console.log(p)
    mongoose.connection.close()
  })

})

person.save().then(() => {
  console.log('person saved!')
  mongoose.connection.close()
})