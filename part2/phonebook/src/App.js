import axios from 'axios'
import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({persons}) => {
  return persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleAddPerson = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    if(persons.filter(person => JSON.stringify(person) === JSON.stringify(newPerson)).length > 0){
      alert(`${newName} is already added to phonebook`)
    } else {
      personService.create(newPerson)
      .then(savedPerson => {
        setPersons([...persons, savedPerson])
      })
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = (newFilter === "") ? persons : persons.filter(({name}) => name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h3>add a new</h3>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleAddPerson={handleAddPerson} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App