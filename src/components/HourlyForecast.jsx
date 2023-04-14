import { useEffect, useState, useRef } from 'react'
import { Box, Stack } from '@mui/material';
//style
import '../assets/style/hourly.scss';
//Components
import HourlyCard from './HourlyCard'
//Axios
import { weatherHourlyOptions } from "../utils/fetchData";
import axios from "axios";

export default function HourlyForecast({ dataKey }) {
  const [hourForecast, setHourlyForecast] = useState(null)
  const scroll = useRef()
  const hour = (new Date()).getHours()
  const days = hour > 11 ? 2 : 1

  useEffect(() => {
    //Request forecast
    const source = axios.CancelToken.source()

    const fetchDataCityWeather = async(q) => {
      await axios.request({...weatherHourlyOptions, params: { q: q, days: days}}, {cancelToken: source.token}).then(function (response) {
        let data;
        if (days === 1) {
          data = response.data.forecast.forecastday[0].hour.slice(hour, 24)
        } else {
          const firstArr = response.data.forecast.forecastday[0].hour.slice(hour, 24)
          const secondArr = response.data.forecast.forecastday[1].hour.slice(0, hour)
          data = firstArr.concat(secondArr)
        }
        setHourlyForecast(data)
      }).catch(function (error) {
        console.error(error);
      });
    }
    fetchDataCityWeather(dataKey)

    return () => {
      source.cancel()
    }
  }, [dataKey, hour, days])

  useEffect(() => {
    scroll.current.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scroll.current.scrollLeft += evt.deltaY*5;

    return () => {
      scroll.current.removeEventListener("wheel")
    }
  });
  }, [])

  return (
    <Box p='10px' mt={2} className='hourlyForecast'>
      <Box sx={{
        maxWidth: '720px',
        margin: 'auto',
        borderRadius: '5px',
        color: '#fff',
        overflow: 'hidden',
        position:'relative',
        
      }}>
        <Box sx={{ bgcolor: '#ffffff1f', padding: '10px' }}>
          <span className='heading'>Hourly forecast</span>
        </Box>
        <hr />

        {/* Map hourlyForecast data */}
        <Stack ref={scroll} className='horizontal-scroll-bar'>
          { hourForecast?.map((item, index) => (<HourlyCard key={index} data={item}/>)) }
        </Stack>

      </Box>
    </Box>
  )
}
