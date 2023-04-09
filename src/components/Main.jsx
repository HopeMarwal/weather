//MUI
import { Box, Stack, Typography } from "@mui/material";
//style
import '../assets/style/main.scss'

export default function Main({data}) {
  const date = new Date()
  const time = date.toLocaleTimeString().slice(0,5)
  return (
    <Box 
      borderRadius='5px'
      p='10px'
      className='main'
      sx={{ maxWidth: '720px', margin: 'auto', marginTop: '20px'}}
    >
      <h5>Current weather</h5>
      <span className="time">{time}</span>
      <Stack
        direction='row'
        alignItems='center'
        gap='10px'
        sx={{fontFamily: "'Quicksand', sans-serif"}}
      >
        <img src={data.forecast.icon} alt={data.forecast.iconPhrase} />
        <span className="temp">{data.forecast.temperature } °C</span>
        <Box pl='15px'>
          <span className="phrase">{data.forecast.iconPhrase}</span>
          <span>Feels like {data.forecast.realFeelTemp} °C</span>
        </Box>
      </Stack>
      <Typography sx={{fontFamily: "'Quicksand', sans-serif"}} mt={1}>
          {data.forecast.phrase}. The high will be {data.Temperature.Maximum.Value}
      </Typography>
      <Stack direction='row'>

      </Stack>
    </Box>
  )
}
