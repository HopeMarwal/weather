//Style
import '../assets/style/detail.scss'
//MUI
import { Box, Stack } from '@mui/material'
//Icons
import { BsSun } from 'react-icons/bs';
import { icons } from '../assets/img/detail/detailIcons'
import {WiMoonAltWaningGibbous5} from 'react-icons/wi'


export default function ForecastDetails({ data }) {

  const sunActiveTime = () => {
    if( data.Sun.Set && data.Sun.Rise) {
      const sun = new Date(data.Sun.Set) - new Date(data.Sun.Rise)
      const hours = sun / ( 1000*60*60 )
      const clearMin = ((hours - Math.floor(hours))*60).toFixed()
      return `${ Math.floor(hours)} h ${clearMin} min`
    } else {
      return '-'
    }
    
  }
  
  const moonActiveTime = () => {
    if(data.Moon.Set && data.Moon.Rise) {
      const moon = new Date(data.Moon.Set) - new Date(data.Moon.Rise)
      const hours = moon / ( 1000*60*60 )
      const clearMin = ((hours - Math.floor(hours))*60).toFixed()
      return `${ Math.floor(hours)} h ${clearMin} min`
    } else {
      return '-'
    }
  }


  return ( 
    <Box className='forecastDetails'>
      <Box>
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
                <img src={icons.sunrise} alt='sunrise' />
                <p>Sunrise</p>
                <span>{data.Sun.Rise ? data.Sun.Rise.slice(11,16) : '-'}</span>
              </Box>

              {/* Sun circle */}
              <Box className='circle_wrapper'>
                <img className='circle' src={icons.sunCircle} alt='sun circle phase'/>
                <span>{sunActiveTime()}</span>
              </Box>

              {/* Sunset */}
              <Box textAlign='center'>
                <img src={icons.sunset} alt='sunrise' />
                <p>Sunset</p>
                <span>{data.Sun.Set ? data.Sun.Set.slice(11,16) : '-'}</span>
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
                <img src={icons.moonrise} alt='moonrise' />
                <p>Moonrise</p>
                <span>{data.Moon.Rise ? data.Moon.Rise.slice(11,16) : '-'}</span>
              </Box>

              {/* Moon circle */}
              <Box className='circle_wrapper'>
                <img className='circle' src={icons.moonCircle} alt='sun circle phase'/>
                <span>{moonActiveTime()}</span>
              </Box>

              {/* Moonset */}
              <Box textAlign='center'>
                <img src={icons.moonset} alt='moonrise' />
                <p>Moonset</p>
                <span>{data.Moon.Set ? data.Moon.Set.slice(11,16) : '-'}</span>
              </Box>
            </Stack>

          </Stack>
        </Stack>
      </Box>
      
    </Box>
  )
}
