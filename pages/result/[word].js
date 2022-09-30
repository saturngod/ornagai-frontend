import { createHmac } from "crypto"
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SearchBar from '../../components/search_bar'

export default function Result({ result }) {
    const res = result.result
    if (res == null) {
        return (
            <div>Not Found</div>
        )
    }
    var oxford = res.oxford
    var oxford_text = ""
    if (oxford != null) {
        oxford_text = oxford.map((value) => "<div class='oxford'>" + value + "</div>").join()
    }

    var ornagai = res.ornagai
    var ornagai_text = ""
    if (ornagai != null) {
        ornagai_text = ornagai.map((value) => "<div class='ornagai'><div class='state'>" + value.state + "</div><div class='def'>" + value.def + "</div></div>").join()
    }

    var engmm = res.eng_mm
    var engmm_text = ""
    if (engmm != null) {
        engmm_text = engmm.map((value) => "<div class='engmm'><div class='def'>" + value.definition + "</div></div>").join()
    }

    return (
        <Container>
            
            <Stack>
            <SearchBar word={res.word}></SearchBar>
                <h1>{res.word}</h1>
                <div dangerouslySetInnerHTML={{ __html: ornagai_text }}></div>
                <div dangerouslySetInnerHTML={{ __html: engmm_text }}></div>
                <div dangerouslySetInnerHTML={{ __html: oxford_text }}></div>
            </Stack>
        </Container>

    )
}

export async function getServerSideProps(context) {
    const word = context.query.word

    const timestamp = Date.now()
    const app_id = "23321321"

    const key = "69722703123"
    const original_string = app_id + ":" + timestamp
    const hash = createHmac('sha1', key)
        .update(original_string)
        .digest('hex')

    const resp = await fetch(`http://localhost:3000/api/result/${word}?timestamp=${timestamp}&hash=${hash}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'app_id': app_id
        }
    })
    const result = await resp.json()
    return {
        props: {
            result
        }
    }
}