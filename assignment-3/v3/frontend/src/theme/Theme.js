import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#71b5bc' },
        secondary: { main: '#e7ab43' },
        divider: '#6f6f6f',
        background: {
            default: '#333238',
            paper: '#4b4a50',
            footer: '#324458',
            header: '#71b5bc'
        },
        text: {
            primary: '#fff',
            secondary: '#d8d7d9',
            onLight: '#333238'
        },
        model: {
            linearRegression: '#71b5bc',
            knn: '#e7ab43',
            kMean: '#dd94b8'
        },
        graph: {
            redPoint: '#d63f3f',
            greenPoint: '#4caf50',
            bluePoint: '#2196f3',
            orangePoint: '#ff9800',
            purplePoint: '#673ab7',
            pinkHighlight: '#e91e63',
            pinkPoint: '#e91e63',
            yellowPoint: '#ffeb3b',
            blackDefault: '#000000',
        }
        
    }
});

export default theme;