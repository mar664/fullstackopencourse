const Weather = ({weather, country}) => {
    if(weather){
        return (
            <div>
                <h2>Weather in {country.capital[0]}</h2>
                temperature {weather.current.temp_c} celsius<br/>
                <img src={weather.current.condition.icon} alt={`${country.name.common} weather`}/><br/>
                wind {weather.current.wind_kph} km/h
            </div>

        )
    } else {
        return null
    }
}

export default Weather