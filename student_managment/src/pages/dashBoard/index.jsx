import React from 'react'
import einteen from '../../assets/images/einstein_01.avif'
import { Box } from '@mui/material'

const index = () => {
  return (
    <Box sx={{overflow:'hidden !important'}}>
      <img alt={'Einteen'} src={einteen} style={{overflow:'hidden !important'}}/>
    </Box>
  )
}

export default index
