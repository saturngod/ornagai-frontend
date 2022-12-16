import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SearchBar from '../components/search_bar';
import Script from 'next/script'




export default function Home({ word }) {


  return (
    <>
      <Container sx={{ pt: 1 }}>
        <h1>Ornagai</h1>
        <Stack spacing={2}>
          <SearchBar word=""></SearchBar>
        </Stack>
      </Container>

      <Container sx={{ pt: 5 }}>
        <Script strategy="lazyOnload" id="ad-load"> {`
	atOptions = {
		'key' : '7e4f681717ace319e62de052b7970e7d',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
    `}
        </Script>
        <Script strategy="lazyOnload" id="ad-link"  src="https://www.profitabledisplayformat.com/7e4f681717ace319e62de052b7970e7d/invoke.js"></Script>
        </Container>

    </>
  )
}
