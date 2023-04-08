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
  const [forecastData, setForecastData] = useState({})
  const [apiData, setApiData] = useState(null)
  const [unit, setUnit] = useState('C')

  useEffect(() => {
    const fetchAPI = async () => {
      //Request API coord
      const ipRequest = await fetch(`https://ipinfo.io/json?token=${ipToken}`)
      const jsonIpResponse = await ipRequest.json()
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

    let iconId = hour > 18 || hour < 4 ? data.Night.Icon : data.Day.Icon
    let icon;

    for(let i = 1; i < weatherIcons.length; i++) {
      if(weatherIcons[i].id === iconId) {
        icon = weatherIcons[i].value
      }
    }

    const forecast = {
      temperature: Math.round((data.Temperature.Minimum.Value + data.Temperature.Maximum.Value)/2),
      icon: icon,
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
      <Heading unit={unit} setUnit={setUnit} />
      <Main />
      <Forecast />
    </div>
  );
}

export default App;
