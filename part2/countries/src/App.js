import axios from 'axios'
import {useState, useEffect} from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [country, setCountry] = useState("")
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(()=>{
      axios.get("https://restcountries.com/v3.1/all").then(response => {
          setCountries(response.data)
      })
  }, [])

  const handleCountryChange = (event) => {
       setCountry(event.target.value)
       const fCountries = countries.filter(countries => countries.name.common.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
       setFilteredCountries(fCountries)
  }

  return (
      <div>
          <Filter country={country} handleCountryChange={handleCountryChange}/>
          <Countries countries={filteredCountries} setFilteredCountries={setFilteredCountries}/>
      </div>
  )

}

export default App