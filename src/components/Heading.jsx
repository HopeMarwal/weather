//MUI
import { Stack, Box, Select, TextField, MenuItem, FormControl } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
//Style
import '../assets/style/heading.scss'

export default function Heading({ unit, setUnit}) {
  return (
    <header>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ maxWidth: '720px', margin: 'auto'}}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#fff',
          borderRadius: '20px',
          padding: '5px 15px'
        }}
        >
          <input placeholder="Search for location"/>
          <SearchIcon fill="#ebebeb" sx={{ fill: '#bebebe'}} />
        </Box>
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