//MUI
import { Box } from "@mui/material"
//Icons
import {weatherIcons} from '../assets/img/icons/weatherIcons';
import { TbDropletFilled } from 'react-icons/tb'

export default function HourlyCard({data}) {
  const icon = weatherIcons.find(el => el.id === data.WeatherIcon )
  const date = new Date(data.DateTime)
  const time = date.toLocaleTimeString().slice(0,5)

  return (
    <Box className='hourlyCard'>
      <img src={icon.value} alt={data.IconPhrase} />
      <span className="temp">{data.Temperature.Value} °</span>
      <span className="desc">{data.IconPhrase}</span>
      <Box mt='auto' display='flex' alignItems='center'>
        <TbDropletFilled />
        <span className="desc">{data.PrecipitationProbability}%</span>
      </Box>
      <hr className="divider" />
      <span className="time">{time}</span>
    </Box>
  )
}
