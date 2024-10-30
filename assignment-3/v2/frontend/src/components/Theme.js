import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#71b5bc' },
        secondary: { main: '#e7ab43' },
        divider: '#6f6f6f',
        background: {
            default: '#333238',
            paper: '#333238',
            footer: '#324458',
            header: '#324458'
        },
        text: {
            primary: '#fff',
            secondary: '#d8d7d9',
            onLight: '#333238'
        },
        model: {
            linearRegression: '#e3de8a',
            knn: '#e7ab43',
            kMean: '#dd94b8'
        }
    }
});

export default theme;
