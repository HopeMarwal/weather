import { Box } from '@mui/material'

export default function AstroData({img, title, time}) {
  return (
    <Box textAlign='center' width='60px'>
        <img src={img} alt={title} />
        <p>{title}</p>
        <span>{time}</span>
    </Box>

  )
}
