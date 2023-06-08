const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  const {name, number} = request.body
  if(!name || !number){
    return response.status(400).send({ error: 'name and number must be supplied' })
  }
  if(persons.some(p => p.name === name)){
    return response.status(400).send({ error: 'name must be unique' })
  }

  const newId = Math.floor(Math.random() * 10000)

  const person = {name, number, id: newId}

  persons = [...persons, person]

  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  const {id} = request.params
  const person = persons.find(p => p.id === Number(id))
  if(person){
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const {id} = request.params
  persons = persons.filter(p => p.id !== Number(id))

  response.status(204).end()
})

app.get('/info', (request, response) => {
  const content = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  response.send(content)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})