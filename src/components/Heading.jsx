//MUI
import { Stack, Box, Select, MenuItem, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
//Style
import '../assets/style/heading.scss'
//React hooks
import { useEffect, useState } from 'react';
//Icons
import { AiOutlineClose } from 'react-icons/ai'
//Axios
import { searchOptions } from "../utils/fetchData";
import axios from "axios";

export default function Heading({ unit, setUnit, currentZone, setKey}) {
  const [inputValue, setInputValue] = useState('')
  const [locations, setLocations] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const regionRender = selectedRegion ? `${selectedRegion.city}, ${selectedRegion.region}`
                                      : `${currentZone.city}, ${currentZone.region}`

  useEffect(() => {
    setSelectedRegion(null)
  }, [currentZone])

  const handleChange = async (e) => {
    setInputValue(e.target.value)
    await axios.request({...searchOptions, params: { q: e.target.value}}).then(function (response) {
      setLocations(response.data)
      setIsModalOpen(true)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const handleClick = (lat, lon ,city, region) => {
    setKey(`${lat}, ${lon}`)
    const data = {city: city, region: region}
    setSelectedRegion(data)
    setInputValue('')
    setIsModalOpen(false)
    setLocations(null)
  }
  return (
    <header>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        flexWrap='wrap'
        sx={{ maxWidth: '720px', margin: 'auto'}}
        position='relative'
      >
        {/* Locations container */}
        <Stack className={`${isModalOpen && locations?.length > 0 && 'open'} locations`}>
          <AiOutlineClose className="close_icon" onClick={() => setIsModalOpen(false)} />
            { locations?.length > 0 && locations.map((item) =>(
              <p key={item.id} onClick={() => handleClick(item.lat, item.lon ,item.name, item.region)}>
              {item.name}, {item.region}, {item.country}
            </p>
            ))}
        </Stack>

        {/* Search */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#fff',
          borderRadius: '20px 20px 0 0',
          padding: '5px 15px',
          width: {xs: '100%', md: 'auto'},
          marginBottom: {xs: '8px', md: '0'}
        }}
        >
          <input
            value={inputValue}
            onChange={handleChange}
            placeholder="Search for location"
            //onKeyUp={handleSearch}
          />
          <SearchIcon fill="#ebebeb" sx={{ fill: '#bebebe'}} />
        </Box>
        <Typography fontFamily="'Quicksand', sans-serif" color='#ebebeb'>
          {regionRender}
        </Typography>

        {/* Select unit */}
        <select
          className="select"
          size='small'
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option value='C'>°C</option>
          <option value='F'>°F</option>
        </select>
      </Stack>
    </header>
  ) 
}
