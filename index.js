
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3001
const morgan = require('morgan')
const cors = require('cors')
app.listen(port)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors())

morgan.token('body', (req, res) => { 
    if(req.method !== "POST"){
        return
    }
    return JSON.stringify(req.body) 
})

app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

console.log(`Server running on port ${port}`)

const fs = require('fs')
let rawdata = fs.readFileSync('db.json');
let data = JSON.parse(rawdata);

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.send(data)
})

app.get('/api/info', (req, res) => {
    let info = {
        message: "Phonebook has info for " + data.persons.length + " people",
        time: new Date()
    }
    res.send(info)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    data.persons.forEach(element => {
        if (element.id === id) {
            res.send(element)
        }
    });
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    data.persons = data.persons.filter(p => p.id !== id)
    fs.writeFileSync('db.json', JSON.stringify(data))
    res.status(204).end()
})


const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

const generateRandomId = () => {
    const randId =  Math.floor((Math.random() * 99999) + 1); 
    return randId;
}

app.post('/api/persons', (req, res) => {
    const person = req.body;

    if(!person.name || !person.number){
        return res.status(400).json({
            error: 'name or number missing'
        })
    }
    if(checkIfNameExists(person.name)){
        return res.status(400).json({
            error: 'name already exists'
        })
    }
    person.id = generateRandomId();
    data.persons = data.persons.concat(person)
    fs.writeFileSync('db.json', JSON.stringify(data))
    res.json({ message: "Person added", data: data})
})

const checkIfNameExists = (name) => {
    data.persons.forEach(element => {
        if(element.name === name){
            return true;
        }
    });
    return false;
}
