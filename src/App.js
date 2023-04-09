import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";
import Heading from "./components/Heading";
import Main from "./components/Main";
import {weatherIcons} from './assets/img/icons/weatherIcons';
import './assets/style/style.scss'

const ipToken = 'a532296877f3d8'
const accuWeatherToken = 'slIlACVHV0hMvoQA15SWVvGjN2B2yCEy'
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

function App() {
  const [forecastData, setForecastData] = useState(null)
  const [apiData, setApiData] = useState(null)
  const [unit, setUnit] = useState('C')
  const [currentZone, setCurrentZone] = useState(null)
 
  useEffect(() => {
    const fetchAPI = async () => {
      //Request API coord
      const ipRequest = await fetch(`https://ipinfo.io/json?token=${ipToken}`)
      const jsonIpResponse = await ipRequest.json()
      setCurrentZone({city: jsonIpResponse.city, region: jsonIpResponse.region})
      setApiData(jsonIpResponse)

       //Request location
       const locationKeyRequest = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${accuWeatherToken}&q=${jsonIpResponse.loc}`)
       const jsonKeyResponse = await locationKeyRequest.json()
       const key = jsonKeyResponse.Key
       
       //Request forecast
       const forecastRequest = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=${accuWeatherToken}&metric=true&details=true`)
       const jsonForecastRes = await forecastRequest.json()
 
       // eslint-disable-next-line
       createForecastObject(jsonForecastRes.DailyForecasts[0])
    }

    fetchAPI()

  }, [])

  const createForecastObject = (data) => {
    const today = new Date()
    const hour = today.getHours()

    const sunset = new Date(data.Sun.Set)
    const sunsetHour = sunset.getHours()

    const sunrise = new Date(data.Sun.Rise)
    const sunriseHour = sunrise.getHours()

    let iconId = hour > sunsetHour || hour < sunriseHour ? data.Night.Icon : data.Day.Icon
    let icon;

    for(let i = 1; i < weatherIcons.length; i++) {
      if(weatherIcons[i].id === iconId) {
        icon = weatherIcons[i].value
      }
    }

    const forecast = {
      realFeelTemp: hour > sunsetHour || hour < sunriseHour ? data.RealFeelTemperature.Minimum.Value : data.RealFeelTemperature.Maximum.Value,
      temperature: Math.round((data.Temperature.Minimum.Value + data.Temperature.Maximum.Value)/2),
      phrase: hour > sunsetHour || hour < sunriseHour ? data.Night.LongPhrase : data.Day.LongPhrase,
      icon: icon,
      iconPhrase: hour > sunsetHour || hour < sunriseHour ? data.Night.IconPhrase : data.Day.IconPhrase
    }

    setForecastData({...data, forecast})
  }

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
      
      {forecastData && <Main data={forecastData} /> }
      <Forecast />
    </div>
  );
}

export default App;
