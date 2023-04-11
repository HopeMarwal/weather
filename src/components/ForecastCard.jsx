//MUI
import { Box, Stack } from "@mui/material"
//Icons
import { TbDropletFilled } from 'react-icons/tb'

var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

export default function ForecastCard({data, selected, setSelected, i}) {
  const currentDate = new Date()
  const today = currentDate.getDate()

  const monthDay = data.date.slice(8,10)
  const weatherMonth = month[data.date.slice(5,7) -1]
 
  const titleDay = today == monthDay ? 'Today' : weatherMonth + ` ` + monthDay
  
  return (
    <Box className={`${selected === i && 'selected'} forecastCard`} onClick={() => setSelected(i)}>
      <p>{titleDay}</p>
      <Stack direction='row' justifyContent='space-between'>
        {/* Day */}
        <Box className='show'>
          <Box display='flex' alignItems='center' gap='5px' mb={1}>
            <img src={data.day.condition.icon} alt={data.day.condition.text}/>
            <span>{data.day.avgtemp_c} °</span>
          </Box>

          {/* Night */}
          <Box display='flex' alignItems='center' gap='5px'>
            <img src={data.hour[3].condition.icon} alt={data.hour[3].condition.text}/>
            <span>{data.hour[3].temp_c} °</span>
          </Box>
        </Box>
        
        {/* Hide when not selected */}
        <Box className={`options ${selected !== i && 'hide'}`}>
          {/* Day */}
          <Box>
            <span>{data.day.condition.text}</span>
            <Box className='add_info'>
              <TbDropletFilled />
              <span>{data.day.daily_chance_of_rain}%</span>
            </Box>
          </Box>

          {/* Night */}
          <Box mt={1}>
            <span>{data.hour[3].condition.text}</span>
            <Box className='add_info'>
              <TbDropletFilled />
              <span>{data.hour[3].chance_of_rain}%</span>
            </Box>
          </Box>
          
        </Box>
      </Stack>
    </Box>
  )
}
