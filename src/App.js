import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";
import Heading from "./components/Heading";
import Main from "./components/Main";

import './assets/style/style.scss'

const ipToken = 'a532296877f3d8'
const accuWeatherToken = 'slIlACVHV0hMvoQA15SWVvGjN2B2yCEy'

function App() {
  const [forecastData, setForecastData] = useState(null)
  const [unit, setUnit] = useState('C')
  const [currentZone, setCurrentZone] = useState(null)
  const [key, setKey] = useState(null)
 
  useEffect(() => {
    const fetchAPI = async () => {
      //Request API coord
      const ipRequest = await fetch(`https://ipinfo.io/json?token=${ipToken}`)
      const jsonIpResponse = await ipRequest.json()
      setCurrentZone({city: jsonIpResponse.city, region: jsonIpResponse.region})

       //Request location
       const locationKeyRequest = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${accuWeatherToken}&q=${jsonIpResponse.loc}`)
       const jsonKeyResponse = await locationKeyRequest.json()
       setKey(jsonKeyResponse.Key)
    }

    fetchAPI()

  }, [])


  return (
    <div className="App">
      {/* 
        Heading (search box, C or F)
        CurrentWeather Component
        5 day Forecast 
        React Charts Graph ? 
      */}
      { currentZone && 
      <Heading
        unit={unit}
        setUnit={setUnit}
        currentZone={currentZone}
        setCurrentZone={setCurrentZone}
      />
      }
      {/* Main weather */}
      {key && <Main dataKey={key} /> }
      {/* Hourly weather forecast */}

      <Forecast />
    </div>
  );
}

export default App;
