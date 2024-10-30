import React from 'react'
import { Container, Typography} from '@mui/material'

const TextSection = ({ title, text }) => {
  return (
    <Container component="section">
        <Typography variant="h2" sx={styles.title}>
            {title}
        </Typography>
        {text.map((paragraph, index) => (
            <Typography key={index} variant="body1" sx={styles.text}>
                {paragraph}
            </Typography>
        ))}
    </Container>
  )
}

const styles = {
    title: {
        textAlign: 'left',
        marginBottom: 6,
    },
    text: {
        marginBottom: 2,
        color: 'text.secondary'
    },
}

export default TextSection