require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('body', function (req, _res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  }).catch(error => {
    console.log(error)
    response.status(500).send({ error: 'unable to return persons' })
  })
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body
  if(!name || !number){
    return response.status(400).send({ error: 'name and number must be supplied' })
  }

  const person = { name, number }

  const personToSave = Person(person)

  personToSave.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    response.json(result)
  }).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const { id } = request.params

  Person.findById(id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).json(
        { error: 'content missing' }
      )
    }
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const { id } = request.params

  Person.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end()
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { id } = request.params
  const { name, number } = request.body

  Person.findByIdAndUpdate(id, { name, number }, { new: true, runValidators: true, context: 'query'  }).then(updatedPerson => {
    console.log(`updated ${updatedPerson.name} number ${updatedPerson.number} to phonebook`)
    response.json(updatedPerson)
  }).catch(error => next(error))
})

app.get('/info', (request, response) => {
  const date = new Date()
  Person.count({}).then(result => {
    const content = `<p>Phonebook has info for ${result} people</p><p>${date}</p>`
    response.send(content)
  }
  )
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})