import {Stack,Container} from '@mui/material'
import SearchBar from './search_bar'

export default function NotFoundResult({word}) {
    return (
        <Container sx={{ pt: 5 }}>
            <h1>Ornagai</h1>
            <Stack>
                <SearchBar word={word}></SearchBar>
                <br />
                <div>Not found : <b>{word}</b> </div>
            </Stack>
        </Container>
    )
}