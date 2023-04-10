import { useState, useEffect } from 'react'
//MUI
import { Box, Stack, Typography } from "@mui/material";
//style
import '../assets/style/main.scss'
//icons
import { MdWindPower, MdAir, MdGrass } from 'react-icons/md';
import { TbUvIndex, TbCloudRain, TbSunrise, TbSunset } from 'react-icons/tb'
import {weatherIcons} from '../assets/img/icons/weatherIcons';

const accuWeatherToken = 'slIlACVHV0hMvoQA15SWVvGjN2B2yCEy'

export default function Main({ dataKey }) {
  
  const [forecastData, setForecastData] = useState(null)
  const date = new Date()
  const time = date.toLocaleTimeString().slice(0,5)
  //Additional weather data
  const additionalData = [
    {
      title: 'Wind',
      value: forecastData?.wind + 'km/h',
      icon: <MdWindPower size='1.2em' />
    },
    {
      title: 'Air quality',
      value: forecastData?.airQuality,
      icon: <MdAir size='1.2em'/>
    },
    {
      title: 'Ragweed',
      value: forecastData?.ragweed,
      icon: <MdGrass size='1.2em' />
    },
    {
      title: 'Rain',
      value: forecastData?.rainProbability + '%',
      icon: <TbCloudRain size='1.2em' />
    },
    {
      title: 'UVIndex',
      value: forecastData?.uvIndex,
      icon: <TbUvIndex size='1.2em' />
    },
    {
      title: 'Sunrise',
      value: forecastData?.sunrise,
      icon: <TbSunrise size='1.2em' />
    },
    {
      title: 'Sunset',
      value: forecastData?.sunset,
      icon: <TbSunset size='1.2em' />
    }
  ]

  //Fetch weather data
  useEffect(() => {
    const fetchAPI = async () => {
       //Request forecast
       const forecastRequest = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${dataKey}?apikey=${accuWeatherToken}&metric=true&details=true`)
       const jsonForecastRes = await forecastRequest.json()
 
       // eslint-disable-next-line
       createForecastObject(jsonForecastRes.DailyForecasts[0])

       //TO DO: clean up function
    }

    fetchAPI()

  }, [dataKey])

  const createForecastObject = (data) => {
    //Get current hour
    const today = new Date()
    const hour = today.getHours()

    //Get sunset hour
    const sunset = new Date(data.Sun.Set)
    const sunsetHour = sunset.getHours()

    //Git sunrise hour
    const sunrise = new Date(data.Sun.Rise)
    const sunriseHour = sunrise.getHours()

    let isNight = hour > sunsetHour || hour < sunriseHour

    let iconId = isNight ? data.Night.Icon : data.Day.Icon
    let icon = weatherIcons.find(el => el.id === iconId)

    //Create weather object
    const weather = {
      realFeelTemp: isNight ? data.RealFeelTemperature.Minimum.Value : data.RealFeelTemperature.Maximum.Value,
      maxTemperature: data.Temperature.Maximum.Value,
      temperature: Math.round((data.Temperature.Minimum.Value + data.Temperature.Maximum.Value)/2),
      phrase: isNight ? data.Night.LongPhrase : data.Day.LongPhrase,
      icon: icon.value,
      iconPhrase: isNight ? data.Night.IconPhrase : data.Day.IconPhrase,
      wind:  isNight ? data.Night.Wind.Speed.Value : data.Day.Wind.Speed.Value,
      rainProbability: isNight? data.Night.RainProbability : data.Day.RainProbability,
      airQuality: data.AirAndPollen[0].Category,
      ragweed:  data.AirAndPollen[3].Category,
      uvIndex:  data.AirAndPollen[5].Category,
      sunrise: sunrise.toLocaleTimeString().slice(0,5),
      sunset: sunset.toLocaleTimeString().slice(0,5)
    }

    setForecastData(weather)
  }
  
  return (
    <Box p='0 10px'>
      <Box 
        borderRadius='5px'
        p='30px 20px'
        className='main'
        sx={{ maxWidth: '720px', margin: 'auto', marginTop: '20px'}}
      >
        <h5>Current weather</h5>
        <span className="time">{time}</span>

        {/* Main weather data */}
        <Stack
          direction='row'
          alignItems='center'
          gap='10px'
          sx={{fontFamily: "'Quicksand', sans-serif"}}
        >
          <img src={forecastData?.icon} alt={forecastData?.iconPhrase} />
          <span className="temp">{forecastData?.temperature } °C</span>

          <Box pl='15px'>
            <span className="phrase">{forecastData?.iconPhrase}</span>
            <span>Feels like {forecastData?.realFeelTemp} °C</span>
          </Box>
          
        </Stack>

        {/* Weather desc */}
        <Typography sx={{fontFamily: "'Quicksand', sans-serif"}} mt={3} mb={3}>
            {forecastData?.phrase}. The high will be {forecastData?.maxTemperature} °C.
        </Typography>

        {/* Additional weather data */}
        <Stack direction='row' justifyContent='space-between' mt={2}>
          {additionalData.map((item) => (
            <Box key={item.title}>
              <Box sx={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                <span className="title">{item.title}</span>
                {item.icon}
              </Box>
              <span className="value">{item.value}</span>
            </Box>
          ))}
          
        </Stack>
      </Box>
    </Box>
    
  )
}
