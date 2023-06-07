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

export default Country