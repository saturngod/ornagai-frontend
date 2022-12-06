import '../styles/globals.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

function MyApp({ Component, pageProps }) {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Component {...pageProps} />
        </ThemeProvider>
  );
}

export default MyApp
