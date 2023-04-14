//Style
import '../assets/style/detail.scss'
//MUI
import { Box, Stack } from '@mui/material'
//Icons
import { BsSun } from 'react-icons/bs';
import { icons, moonPhase } from '../assets/img/detail/detailIcons'
import { MdAir } from 'react-icons/md';
//Components
import AstroData from './AstroData';

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
            justifyContent={{xs: 'center', md: 'space-between'}}
            p={{md: '10px', lg:'10px 20px'}}
            alignItems='center'
            gap={{xs: '30px', md: '0'}}
            flexWrap='wrap'
          >

            {/* UVindex */}
            <Stack
              direction='row'
              alignItems='center'
              gap={{xs: '15px', md:'10px', lg: '15px'}}
              width={{md: '119px', lg: '144px'}}
            >
              <BsSun size='1.5em' className='icon' />
              <Stack>
                <p>UV index</p>
                <span>{data.day.uv}</span>
              </Stack>
            </Stack>

            {/* Wind */}
            <Stack
              direction='row'
              alignItems='center'
              gap={{xs: '15px',  md:'10px', lg: '15px'}}
            >
              <MdAir size='1.5em' className='icon' />
              <Stack>
                <p>Wind</p>
                <span>{data.day.maxwind_kph} km/h</span>
              </Stack>
            </Stack>

            {/* Sun phase */}
            <Stack
              direction='row'
              width={{xs:'100%', md: '280px'}}
              justifyContent={{xs: 'center', md: 'space-between'}}
            >
              {/* Sunrise */}
              <AstroData
                img={icons.sunrise}
                title='Sunrise'
                time={data.astro.sunrise}
              />

              {/* Sun circle */}
              <Box className='circle_wrapper'>
                <img className='circle' src={icons.sunCircle} alt='sun circle phase'/>
              </Box>

              {/* Sunset */}
              <AstroData
                img={icons.sunset}
                title='Sunset'
                time={data.astro.sunset}
              />
            </Stack>
          </Stack>

          <hr  />

          {/* Moon details */}
          <Stack
            direction='row'
            justifyContent={{xs: 'center', md: 'space-between'}}
            p={{md: '10px', lg:'10px 20px'}}
            alignItems='center'
            gap={{xs: '30px', md: '0'}}
            flexWrap='wrap'
          >

            <Stack direction='row' alignItems='center' gap={{ xs: '15px', md:'10px', lg: '15px'}} >
              <img src={renderMoonPhase.value} className='icon' alt={data.astro.moon_phase} />
              <Stack>
                <p>Moon Phase</p>
                <span>{data.astro.moon_phase}</span>
              </Stack>
            </Stack>

             {/* Wind */}
             <Stack  direction='row' alignItems='center' gap={{xs: '15px', md:'10px', lg: '15px'}}>
              <MdAir size='1.5em' className='icon' />
              <Stack>
                <p>Wind</p>
                <span>{data.hour[3].wind_kph} km/h</span>
              </Stack>
            </Stack>

            {/* Moon phase */}
            <Stack
              direction='row'
              width={{xs:'100%', md: '280px'}}
              justifyContent={{xs: 'center', md: 'space-between'}}
            >
              {/* Moonrise */}
              <AstroData
                img={icons.moonrise}
                title='Moonrise'
                time={data.astro.moonrise}
              />

              {/* Moon circle */}
              <Box className='circle_wrapper'>
                <img className='circle' src={icons.moonCircle} alt='sun circle phase'/>
              </Box>

              {/* Moonset */}
              <AstroData
                img={icons.moonset}
                title='Moonset'
                time={data.astro.moonset}
              />
            </Stack>

          </Stack>
        </Stack>
      </Box>
      
    </Box>
  )
}
