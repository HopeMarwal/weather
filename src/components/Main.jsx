import { useState, useEffect } from 'react'
//MUI
import { Box, Stack } from "@mui/material";
//style
import '../assets/style/main.scss';
import { fog, rain, snow, sleet, thunder, cloud } from '../assets/img/icons/weatherIcons';
//icons
import { MdAir, MdOutlineVisibility } from 'react-icons/md';
import { WiHumidity, WiBarometer } from 'react-icons/wi'
import { TbUvIndex } from 'react-icons/tb'
//Axios
import { weatherOptions } from "../utils/fetchData";
import axios from "axios";
//context
import { useUnit } from "../context/unitContext";

export default function Main({ dataKey, setBgPhrase }) {
  const { unit } = useUnit()
  
  const [forecastData, setForecastData] = useState(null)
  const [clName, setClName] = useState('')
  const date = new Date()
  const time = date.toLocaleTimeString().slice(0,5)
  //Additional weather data
  const additionalData = [
    {
      title: 'Wind',
      value: forecastData?.wind_kph + 'km/h',
      icon: <MdAir size='1.2em' />
    },
    {
      title: 'Visibility',
      value: forecastData?.vis_km + 'km',
      icon: <MdOutlineVisibility size='1.1em'/>
    },
    {
      title: 'Pressure',
      value: forecastData?.pressure_mb + 'mb',
      icon: <WiBarometer size='1.3em' />
    },
    {
      title: 'Humidity',
      value: forecastData?.humidity + '%',
      icon: <WiHumidity size='1.2em' />
    },
    {
      title: 'UVIndex',
      value: forecastData?.uv,
      icon: <TbUvIndex size='1.2em' />
    }

  ]

  //Fetch weather data
  useEffect(() => {
    const source = axios.CancelToken.source()
    const fetchDataCityWeather = async(q) => {
      await axios.request({...weatherOptions, params: { q: q}}, {cancelToken: source.token}).then(function (response) {
        setForecastData(response.data.current)
        setBgPhrase(response.data.current.condition.text)
        handleChangeClass(response.data.current.condition.text, response.data.current.is_day)
      }).catch(function (error) {
        console.error(error);
      });
    }
    fetchDataCityWeather(dataKey)

    return () => {
      source.cancel()
    }
  }, [dataKey])

  const handleChangeClass = (condition, isDay) => {
    let newClName;
    switch (true){
      case fog.includes(condition):
        newClName='fog'
        break;
      case rain.includes(condition):
        newClName='rain'
        break;
      case snow.includes(condition):
        newClName='snow'
        break;
      case sleet.includes(condition):
        newClName='sleet'
        break;  
      case thunder.includes(condition):
        newClName='thunder'
        break;
      case cloud.includes(condition) && isDay === 1:
        newClName='cloud_day'
        break;
      case cloud.includes(condition) && isDay === 0:
        newClName='cloud_night'
        break;
      case condition === 'Partly cloudy' && isDay === 1:
        newClName='p_cloud_day'
        break;
      case condition === 'Partly cloudy' && isDay === 0:
        newClName='p_cloud_night'
        break;
      case condition === 'Clear':
        newClName='clear'
        break;
      case condition === 'Sunny':
        newClName='sunny'
        break;
      default: console.log(`Sorry, we are out of conditions`);
        break;
    }
    setClName(newClName)
  }

  return (
    <Box p='0 10px'>
      <Box 
        borderRadius='5px'
        p='30px 20px'
        className={`main ${clName}`}
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
          <img src={forecastData?.condition.icon} alt={forecastData?.condition.text} />
          <span className="temp">{unit === 'C' ? forecastData?.temp_c : forecastData?.temp_f}°</span>

          <Box pl='15px'>
            <span className="phrase">{forecastData?.condition.text}</span>
            <span>Feels like {forecastData?.feelslike_c}°</span>
          </Box>
          
        </Stack>

        {/* Additional weather data */}
        <Stack
          direction='row'
          justifyContent='space-between'
          mt={2}
          flexWrap='wrap'
          gap='10px'
        >
          {additionalData.map((item) => (
            <Box
              key={item.title}
              width={{xs: 'calc(50% - 5px)', md: 'auto'}}
            >
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
