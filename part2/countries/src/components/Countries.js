import Country from "./Country"

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

  export default Countries