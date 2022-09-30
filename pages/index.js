import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SearchBar from '../components/search_bar';




export default function Home({word}) {

  

  
  

  return (
    <Container sx={{ pt: 5 }}>

      <Stack spacing={2}>
      <SearchBar word=""></SearchBar>
        

       
      </Stack>

    </Container>
  )
}
