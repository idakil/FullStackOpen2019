import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = (props) => {
    const [weather, setWeather] = useState({})
    useEffect(() => {
        getWeather(props.capital)
    }, [props.capital])

    const getWeather = async (capital) => {
        const apiKey = 'c690d4dfc32df850a8dba8b28a6410aa';
        const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + capital + '&units=metric&appid=' + apiKey;
        await axios.get(url)
            .then((res => setWeather(res.data)))
    }

    const W = () => {
        if (Object.values(weather).length < 1) {
            return <div></div>
        } else {
            const icon = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"
            return <div>
                <div>temperature: {weather.main.temp} </div>
                <div><img src={icon} alt="icon"></img></div>
                <div>wind: {weather.wind.speed} kph direction {weather.wind.deg} degrees</div>
            </div>
        }

    }

    return (
        <div>
            <h2>Weather in {props.capital}</h2>
            {W()}
        </div>
    )
}

export default Weather
