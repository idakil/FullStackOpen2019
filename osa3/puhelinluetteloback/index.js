require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())

morgan.token('body', (req) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    return JSON.stringify(req.body)
  }
  return
})

app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

/**
 * Before MongoDB
 */
const fs = require('fs')
let rawdata = fs.readFileSync('db.json')
let data = JSON.parse(rawdata)

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(p => p.toJSON()))
  })
})

app.get('/api/info', (req, res) => {
  /*let info = {
        message: "Phonebook has info for " + data.persons.length + " people",
        time: new Date()
    }*/
  Person.collection.countDocuments({}).then(p => {
    let info = {
      message: 'Phonebook has info for ' + p + ' people',
      time: new Date()
    }
    res.send(info)
  })

})


app.get('/api/persons/:id', (req, res, next) => {
  /*const id = Number(req.params.id)
    data.persons.forEach(element => {
        if (element.id === id) {
            res.send(element)
        }
    });*/
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person.toJSON())
    } else {
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  /*const id = Number(req.params.id)
    data.persons = data.persons.filter(p => p.id !== id)
    fs.writeFileSync('db.json', JSON.stringify(data))
    res.status(204).end()*/
  Person.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end()
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updated => {
      res.json(updated.toJSON())
    })
    .catch(error => next(error))
})

/*
const generateId = () => {
  const maxId = data.persons.length > 0
    ? Math.max(...data.persons.map(n => n.id))
    : 0
  return maxId + 1
}
const generateRandomId = () => {
  const randId = Math.floor((Math.random() * 99999) + 1)
  return randId
}*/

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }
  if (checkIfNameExists(body.name)) {
    return res.status(400).json({
      error: 'name already exists'
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })
  //person.id = generateRandomId();
  //data.persons = data.persons.concat(person)
  //fs.writeFileSync('db.json', JSON.stringify(data))
  person.save().then(saved => {
    res.json(saved.toJSON())
  })
    .catch(error => next(error))
    //res.json({ message: "Person added", data: data })
})

const checkIfNameExists = (name) => {
  data.persons.forEach(element => {
    if (element.name === name) {
      return true
    }
  })
  return false
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  console.log(error.name)
  next(error)
}
app.use(errorHandler)