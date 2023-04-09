import { useEffect, useState, useRef } from 'react'
import { Box, Stack } from '@mui/material';
//style
import '../assets/style/hourly.scss';
//Components
import HourlyCard from './HourlyCard'


const accuWeatherToken = 'slIlACVHV0hMvoQA15SWVvGjN2B2yCEy'

export default function HourlyForecast({ dataKey }) {
  const [hourForecast, setHourlyForecast] = useState(null)
  const scroll = useRef()

  useEffect(() => {
    const fetchAPI = async () => {
      //Request forecast
      const forecastRequest = await fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${dataKey}?apikey=${accuWeatherToken}&metric=true`)
      const jsonForecastRes = await forecastRequest.json()
      setHourlyForecast(jsonForecastRes)
      
      //TO DO: clean up function
    }

    fetchAPI()

  }, [dataKey])

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
          {
            hourForecast?.map((item, index) => (<HourlyCard key={index} data={item}/>))
          }
        </Stack>

      </Box>
    </Box>
  )
}
