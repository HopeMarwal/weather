//MUI
import { Stack, Box, Select, MenuItem, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
//Style
import '../assets/style/heading.scss'
//React hooks
import { useState } from 'react';
//Icons
import { AiOutlineClose } from 'react-icons/ai'

const accuWeatherToken = 'slIlACVHV0hMvoQA15SWVvGjN2B2yCEy'

export default function Heading({ unit, setUnit, currentZone, setKey}) {
  const [inputValue, setInputValue] = useState('')
  const [locations, setLocations] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const regionRender = selectedRegion ? `${selectedRegion.city}, ${selectedRegion.region}`
                                      : `${currentZone.city}, ${currentZone.region}`

  const handleSearch = async (e) => {
    //console.log(e.code)
    if(e.code === 'Enter') {
      const foundLocs = await fetch(`http://dataservice.accuweather.com/locations/v1/search?apikey=${accuWeatherToken}&q=${inputValue}%20&details=false`)
      const foundLocsData = await foundLocs.json()
      setLocations(foundLocsData.slice(0, 10))
      setIsModalOpen(true)
      setInputValue('')
    }
  }

  const handleClick = (key, city, region) => {
    console.log(key)
    setKey(key)
    const data = {city: city, region: region}
    setSelectedRegion(data)
    setIsModalOpen(false)
  }
  return (
    <header>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ maxWidth: '720px', margin: 'auto'}}
        position='relative'
      >
        {/* Locations container */}
        <Stack className={`${isModalOpen && 'open'} locations`}>
          <AiOutlineClose className="close_icon" onClick={() => setIsModalOpen(false)} />
          {
            locations?.map((item) => (
              <p key={item.Key} onClick={() => handleClick(item.Key, item.EnglishName, item.AdministrativeArea.EnglishName)}>
                {item.EnglishName}, {item.AdministrativeArea.EnglishName}, {item.Country.EnglishName}
              </p>
            ))
          }
        </Stack>

        {/* Search */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#fff',
          borderRadius: '20px 20px 0 0',
          padding: '5px 15px'
        }}
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for location"
            onKeyUp={handleSearch}
          />
          <SearchIcon fill="#ebebeb" sx={{ fill: '#bebebe'}} />
        </Box>
        <Typography fontFamily="'Quicksand', sans-serif" color='#ebebeb'>
          {regionRender}
        </Typography>

        {/* Select unit */}
        <Select
          className="select"
          size='small'
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          sx={{
            height: '30px',
            color: '#ebebeb'
          }}
        >
          <MenuItem value='C'>°C</MenuItem>
          <MenuItem value='F'>°F</MenuItem>
        </Select>
      </Stack>
    </header>
  )
}
