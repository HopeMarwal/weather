//MUI
import { Box, Stack } from "@mui/material"
//Icons
import { weatherIcons } from '../assets/img/icons/weatherIcons';
import { TbDropletFilled } from 'react-icons/tb'

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function ForecastCard({data, selected, setSelected, i}) {
  const currentDate = new Date()
  const today = currentDate.getDate()
  const isNight = currentDate.getHours() > 18 || currentDate.getHours() < 5

  const date = new Date(data.Date)
  const weekDay = date.getDay()
  const monthDay = date.getDate()
 
  const titleDay = today === monthDay && isNight
                  ? 'Tonight' 
                  : today === monthDay && !isNight
                    ? 'Today'
                    : weekDays[weekDay] + ` ` + monthDay

  const iconDay = weatherIcons.find(el => el.id === data.Day.Icon)
  const iconNight = weatherIcons.find(el => el.id === data.Night.Icon)
  
  return (
    <Box className={`${selected === i && 'selected'} forecastCard`} onClick={() => setSelected(i)}>
      <p>{titleDay}</p>
      <Stack direction='row' justifyContent='space-between'>
        {/* Day */}
        <Box className='show'>
          <Box display='flex' alignItems='center' gap='5px' mb={1}>
            <img src={iconDay.value} alt={data.Day.IconPhrase}/>
            <span>{data.Temperature.Maximum.Value} °</span>
          </Box>

          {/* Night */}
          <Box display='flex' alignItems='center' gap='5px'>
            <img src={iconNight.value} alt={data.Night.IconPhrase}/>
            <span>{data.Temperature.Minimum.Value} °</span>
          </Box>
        </Box>
        
        {/* Hide when not selected */}
        <Box className={`options ${selected !== i && 'hide'}`}>
          {/* Day */}
          <Box>
            <span>{data.Day.IconPhrase}</span>
            <Box className='add_info'>
              <TbDropletFilled />
              <span>{data.Day.PrecipitationProbability}%</span>
            </Box>
          </Box>

          {/* Night */}
          <Box mt={1}>
            <span>{data.Night.IconPhrase}</span>
            <Box className='add_info'>
              <TbDropletFilled />
              <span>{data.Night.PrecipitationProbability}%</span>
            </Box>
          </Box>
          
        </Box>
      </Stack>
    </Box>
  )
}
