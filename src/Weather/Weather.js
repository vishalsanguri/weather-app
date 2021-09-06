import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import "./Weather.css"

export default function Weather() {
    const [place, setPlace] = useState("")
    const [temp, setTemp] = useState(0)
    const [data, setData] = useState()
    let API_KEY1 = "e4397b3c6337708266159b6a0a52af5e"
    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    const getdata = async () => {
        let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY1}`)
        let data = await response.data
        setTemp(parseFloat(data.main.temp - 273).toFixed(2))
        setData(data)
        setPlace("")
    }
    const returner = () => {
        if (temp === 0) {
            return "backdiv"
        }
        else if (temp < 20) { return ("backdivcold1") }
        else { return ("backdivhot") }
    }
    return (
        <div className={returner()}>
            <div className="frontdiv">
                <p style={{ fontSize: "6vw", padding: "10px" }}> <b> Weather App </b> </p>
                <input placeholder="search place" type="text" value={place} onChange={(e) => { setPlace(e.target.value) }} /> <br />
                <button onClick={() => { getdata(); }}>GO</button>
                <div className="content">
                    {data ?
                        <div>
                            <div>
                                {data.name},{data.sys.country}
                            </div>
                            <div className="tempbox">
                                {parseFloat(data.main.temp - 273).toFixed(2)} <sup>o</sup>C
                            </div>
                            <div style={{ color: "white" }}>
                                {data.weather.map(({ main }) => { return <div key="1">{main}</div> })}
                            </div>
                        </div>
                        :
                        <div>
                            <div>
                                Place
                            </div>
                            <div className="tempbox">
                                temp <sup>o</sup>C
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
