import React from 'react'
import { Box } from '@mui/material'

const Spacer = () => {
  return (
    <Box
        sx={{
            height: "4px",
            width: "100%",
            margin: "80px 0",
            borderRadius: "8px",
            bgcolor: "#6f6f6f",
        }}
    >
    </Box>
    )
}

export default Spacer