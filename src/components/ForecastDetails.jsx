//Style
import '../assets/style/detail.scss'
//MUI
import { Box, Stack } from '@mui/material'
//Icons
import { BsSun } from 'react-icons/bs';
import moonCircle from '../assets/img/detail/moonCircle.svg'
import moonrise from '../assets/img/detail/moonrise.svg'
import moonset from '../assets/img/detail/moonset.svg'
import sunCircle from '../assets/img/detail/sunCircle.svg'
import sunrise from '../assets/img/detail/sunrise.svg'
import sunset from '../assets/img/detail/sunset.svg'
import {WiMoonAltWaningGibbous5} from 'react-icons/wi'



export default function ForecastDetails({ data }) {
  const sunriseD = (new Date(data.Sun.Rise)).toLocaleTimeString().slice(0,5)
  const sunsetD = (new Date(data.Sun.Set)).toLocaleTimeString().slice(0,5)
  const moonriseD = (new Date(data.Moon.Rise)).toLocaleTimeString().slice(0,5)
  const moonsetD = (new Date(data.Moon.Set)).toLocaleTimeString().slice(0,5)

  const sunActiveTime = () => {
    const sun = new Date(data.Sun.Set) - new Date(data.Sun.Rise)
    const hours = sun / ( 1000*60*60 )
    const clearMin = ((hours - Math.floor(hours))*60).toFixed()
    return `${ Math.floor(hours)} h ${clearMin} min`
  }
  
  const moonActiveTime = () => {
    const moon = new Date(data.Moon.Set) - new Date(data.Moon.Rise)
    const hours = moon / ( 1000*60*60 )
    const clearMin = ((hours - Math.floor(hours))*60).toFixed()
    return `${ Math.floor(hours)} h ${clearMin} min`
  }


  return ( 
    <Box className='forecastDetails'>
      <Box 

      >
        <p className='title'>More details</p>
        <hr />
        <Stack>
          {/* Sun details */}
          <Stack
            direction='row'
            justifyContent='space-between'
            p='10px 20px'
            alignItems='center'
            mb={3}
          >

            {/* UVindex */}
            <Stack direction='row' alignItems='center' gap='15px'>
              <BsSun size='1.5em' className='icon' />
              <Stack>
                <p>UV index</p>
                <span>{data.AirAndPollen[5].Value} · {data.AirAndPollen[5].Category}</span>
              </Stack>
            </Stack>

            {/* Sun phase */}
            <Stack direction='row' width='280px' justifyContent='space-between'>
              {/* Sunrise */}
              <Box textAlign='center'>
                <img src={sunrise} alt='sunrise' />
                <p>Sunrise</p>
                <span>{sunriseD}</span>
              </Box>

              {/* Sun circle */}
              <Box className='circle_wrapper'>
                <img className='circle' src={sunCircle} alt='sun circle phase'/>
                <span>{sunActiveTime()}</span>
              </Box>

              {/* Sunset */}
              <Box textAlign='center'>
                <img src={sunset} alt='sunrise' />
                <p>Sunset</p>
                <span>{sunsetD}</span>
              </Box>
            </Stack>

          </Stack>
          
          <Stack
            direction='row'
            justifyContent='space-between'
            p='10px 20px'
            alignItems='center'
          >

            {/* Moon details */}
            <Stack direction='row' alignItems='center' gap='15px'>
              <WiMoonAltWaningGibbous5 size='1.5em' className='icon' />
              <Stack>
                <p>Moon Phase</p>
                <span>{data.Moon.Phase}</span>
              </Stack>
            </Stack>

            {/* Moon phase */}
            <Stack direction='row' width='280px' justifyContent='space-between'>
              {/* Moonrise */}
              <Box textAlign='center'>
                <img src={moonrise} alt='moonrise' />
                <p>Moonrise</p>
                <span>{moonriseD}</span>
              </Box>

              {/* Moon circle */}
              <Box className='circle_wrapper'>
                <img className='circle' src={moonCircle} alt='sun circle phase'/>
                <span>{moonActiveTime()}</span>
              </Box>

              {/* Moonset */}
              <Box textAlign='center'>
                <img src={moonset} alt='moonrise' />
                <p>Moonset</p>
                <span>{moonsetD}</span>
              </Box>
            </Stack>

          </Stack>
        </Stack>
      </Box>
      
    </Box>
  )
}
