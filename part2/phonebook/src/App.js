import axios from 'axios'
import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Filter = ({newFilter, setNewFilter}) => {
  return ( <div>
        filter shown with<input value={newFilter} onChange={(e) => setNewFilter(e.target.value)} />
    </div>
    )
}

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, handleAddPerson}) => {
  return (<form>
    <div>
      name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
    </div>
    <div>
      number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
    </div>
    <div>
      <button type="submit" onClick={handleAddPerson}>add</button>
    </div>
  </form>
  )
}

const Persons = ({persons, handleDelete}) => {
  return persons.map(person => <p key={person.id}>{person.name} {person.number}<button onClick={() => handleDelete(person)}>delete</button></p>)
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  
  const displayErrorMessage = (message) => {
    setErrorMessage(
      message
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }


  const displaySuccessMessage = (message) => {
    setSuccessMessage(
      message
    )
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleAddPerson = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    const existingPerson = persons.find(({name}) => name === newName)

    if(existingPerson !== undefined){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService.update(existingPerson.id, newPerson).then(savedPerson => {
              setPersons(persons.map(p => (p.id === existingPerson.id) ? savedPerson : p))
              setNewName('')
              setNewNumber('')
              displaySuccessMessage(`Updated ${savedPerson.name}`)
          }).catch(e => {
            displayErrorMessage(`the person '${existingPerson.name}' was already deleted from server`)
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
    } else {
      personService.create(newPerson)
      .then(savedPerson => {
        setPersons([...persons, savedPerson])          
        setNewName('')
        setNewNumber('')
        displaySuccessMessage(`Added ${savedPerson.name}`)
      }).catch(e => {
        displayErrorMessage(`the person '${newPerson.name}' was not able to be saved to the server`)
      })
    }
  }

  const handleDelete = ({id, name}) => {
    if(window.confirm(`Delete ${name} ?`)){

    personService.remove(id)
      .then(deletedPerson => {
        setPersons(persons.filter(person => person.id !== id))
        displaySuccessMessage(`Removed ${name}`)
      }).catch(e => {
        displayErrorMessage(`the person '${name}' was already removed to the server`)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const personsToShow = (newFilter === "") ? persons : persons.filter(({name}) => name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h3>add a new</h3>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleAddPerson={handleAddPerson} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App