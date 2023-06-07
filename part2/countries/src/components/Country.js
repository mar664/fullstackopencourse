import {useState, useEffect} from 'react'
import axios from 'axios'
import Weather from './Weather'

const Country = ({country}) => {
    const [weather, setWeather] = useState(null)


    useEffect(()=>{
        const params = {
            key: process.env.REACT_APP_API_KEY,
            q: country.capital[0]
          }
        axios.get("http://api.weatherapi.com/v1/current.json",
        {params}).then(response => {
            setWeather(response.data)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const flagStyle = {
      height: 150
    }

    return (
        <div>
            <Weather weather={weather} country={country} />
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

export default Country