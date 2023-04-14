//MUI
import { Box, Stack } from "@mui/material"
//Icons
import { TbDropletFilled } from 'react-icons/tb'
//context
import { useUnit } from "../context/unitContext";

var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

export default function ForecastCard({data, selected, setSelected, i}) {
  const { unit } = useUnit()
  const currentDate = new Date()
  const today = currentDate.getDate()

  const monthDay = data.date.slice(8,10)
  const weatherMonth = month[data.date.slice(5,7) -1]
 
  // eslint-disable-next-line
  const titleDay = today == monthDay ? 'Today' : weatherMonth + ` ` + monthDay
  
  return (
    <Box className={`${selected === i && 'selected'} forecastCard`} onClick={() => setSelected(i)}>
      <p>{titleDay}</p>
      <Stack direction='row' justifyContent='space-between'>
        {/* Day */}
        <Box className='show'>
          <Box display='flex' alignItems='center' gap='5px' mb={1}>
            <img src={data.day.condition.icon} alt={data.day.condition.text}/>
            <span>{unit === 'C' ? data.day.avgtemp_c : data.day.avgtemp_f} °</span>
          </Box>

          {/* Night */}
          <Box display='flex' alignItems='center' gap='5px'>
            <img src={data.hour[3].condition.icon} alt={data.hour[3].condition.text}/>
            <span>{unit === 'C' ? data.hour[3].temp_c : data.hour[3].temp_f} °</span>
          </Box>
        </Box>
        
        {/* Hide when not selected */}
        <Box className={`options ${selected !== i && 'hide'}`}>
          {/* Day */}
          <Box>
            <span>{data.day.condition.text}</span>
            <Box className='add_info'>
              <TbDropletFilled />
              <span>{data.day.avghumidity}%</span>
            </Box>
          </Box>

          {/* Night */}
          <Box mt={1}>
            <span>{data.hour[3].condition.text}</span>
            <Box className='add_info'>
              <TbDropletFilled />
              <span>{data.hour[3].humidity}%</span>
            </Box>
          </Box>
          
        </Box>
      </Stack>
    </Box>
  )
}
