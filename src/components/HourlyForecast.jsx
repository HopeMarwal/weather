import { useEffect, useState } from 'react'
import { Box, Stack } from '@mui/material';
//style
import '../assets/style/hourly.scss';
//Components
import HourlyCard from './HourlyCard'


const accuWeatherToken = 'slIlACVHV0hMvoQA15SWVvGjN2B2yCEy'

export default function HourlyForecast({ dataKey }) {
  const [hourForecast, setHourlyForecast] = useState(null)

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
          <span className='heading'>Hourly</span>
        </Box>
        <hr />

        {/* Map hourlyForecast data */}
        <Stack
          direction='row'
          gap='3px'
          sx={{overflowX: 'scroll'}}
        >
          {
            hourForecast?.map((item, index) => (<HourlyCard key={index} data={item}/>))
          }
        </Stack>

      </Box>
    </Box>
  )
}
