import axios from 'axios'
import {useState, useEffect} from 'react'

const Country = ({country}) => {
  const flagStyle = {
    height: 150
  }
  return (
      <div>
          <h2>{country.name.common}</h2>
          capital {country.capital[0]}<br/>
          area {country.area}<br/><br/>
          <b>languages:</b>
          <ul>
              {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
          </ul>
          <img src={country.flags.png} style={flagStyle} alt={`${country.name.common} flag`}/>
      </div>
  )

}

const Countries = ({countries, setFilteredCountries}) => {
  if (countries.length > 10){
    return (
        <p>
        Too many matches, specify another filter
        </p>
    )
  } else if(countries.length > 1) {
      return (
          <ul>
          {countries.map(country => { 
          return (<li key={country.name.common}>{country.name.common}<button onClick={() => setFilteredCountries([country])}>show</button></li>)
        })}
          </ul>
      )

  } else if(countries.length === 1) {
      console.log(countries[0])
      return (
          <Country country={countries[0]}/>
      )
  }
}

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
          find countries <input value={country} onChange={handleCountryChange}/>
          <Countries countries={filteredCountries} setFilteredCountries={setFilteredCountries}/>
      </div>
  )

}

export default App