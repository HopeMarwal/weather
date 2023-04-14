//Style
import '../assets/style/detail.scss'
//MUI
import { Box, Stack } from '@mui/material'
//Icons
import { BsSun } from 'react-icons/bs';
import { icons, moonPhase } from '../assets/img/detail/detailIcons'
import { MdAir } from 'react-icons/md';

export default function ForecastDetails({ data }) {
  const renderMoonPhase = moonPhase.find(el => el.title === data.astro.moon_phase)
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
            <Stack direction='row' alignItems='center' gap='15px' width='144px'>
              <BsSun size='1.5em' className='icon' />
              <Stack>
                <p>UV index</p>
                <span>{data.day.uv}</span>
              </Stack>
            </Stack>

            {/* Wind */}
            <Stack  direction='row' alignItems='center' gap='15px' >
              <MdAir size='1.5em' className='icon' />
              <Stack>
                <p>Wind</p>
                <span>{data.day.maxwind_kph} km/h</span>
              </Stack>
            </Stack>

            {/* Sun phase */}
            <Stack direction='row' width='280px' justifyContent='space-between'>
              {/* Sunrise */}
              <Box textAlign='center' width='60px'>
                <img src={icons.sunrise} alt='sunrise' />
                <p>Sunrise</p>
                <span>{data.astro.sunrise}</span>
              </Box>

              {/* Sun circle */}
              <Box className='circle_wrapper'>
                <img className='circle' src={icons.sunCircle} alt='sun circle phase'/>
              </Box>

              {/* Sunset */}
              <Box textAlign='center'  width='60px'>
                <img src={icons.sunset} alt='sunrise' />
                <p>Sunset</p>
                <span>{data.astro.sunset}</span>
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
              <img src={renderMoonPhase.value} className='icon' alt={data.astro.moon_phase} />
              <Stack>
                <p>Moon Phase</p>
                <span>{data.astro.moon_phase}</span>
              </Stack>
            </Stack>

             {/* Wind */}
             <Stack  direction='row' alignItems='center' gap='15px'>
              <MdAir size='1.5em' className='icon' />
              <Stack>
                <p>Wind</p>
                <span>{data.hour[3].wind_kph} km/h</span>
              </Stack>
            </Stack>

            {/* Moon phase */}
            <Stack direction='row' width='280px' justifyContent='space-between'>
              {/* Moonrise */}
              <Box textAlign='center'>
                <img src={icons.moonrise} alt='moonrise' />
                <p>Moonrise</p>
                <span>{data.astro.moonrise}</span>
              </Box>

              {/* Moon circle */}
              <Box className='circle_wrapper'>
                <img className='circle' src={icons.moonCircle} alt='sun circle phase'/>
              </Box>

              {/* Moonset */}
              <Box textAlign='center'>
                <img src={icons.moonset} alt='moonrise' />
                <p>Moonset</p>
                <span>{data.astro.moonset}</span>
              </Box>
            </Stack>

          </Stack>
        </Stack>
      </Box>
      
    </Box>
  )
}
