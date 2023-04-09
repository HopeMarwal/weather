import { useEffect, useState } from 'react'
//MUI
import { Box, Stack } from '@mui/material'
import ForecastCard from './ForecastCard'
//Style
import '../assets/style/forecast.scss'

const accuWeatherToken = 'slIlACVHV0hMvoQA15SWVvGjN2B2yCEy'
export default function Forecast({ dataKey}) {
  const [forecast, setForecast] = useState(null)
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    const fetchAPI = async () => {
      //Request forecast
      const forecastRequest = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${dataKey}?apikey=${accuWeatherToken}&metric=true&details=true`)
      const jsonForecastRes = await forecastRequest.json()
      setForecast(jsonForecastRes.DailyForecasts)
      
      //TO DO: clean up function
    }

    fetchAPI()

  }, [dataKey])
  return (
    <Box p='10px'>
      <Stack direction='row' maxWidth='720px' margin='auto' justifyContent='space-between'>
        {
          forecast?.map((item, index) => ( 
          <ForecastCard
            i={index}
            key={index}
            data={item}
            selected={selected}
            setSelected={setSelected}
          />
          ))
        }
      </Stack>
      {/* 5 days forecast selected details */}
    </Box>
  )
}
