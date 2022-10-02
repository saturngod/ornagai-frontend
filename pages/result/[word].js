import { createHmac } from "crypto"
import { Stack, Container } from '@mui/material'
import SearchBar from '../../components/search_bar'
import Grid from "@mui/material/Unstable_Grid2/Grid2";


import SynonymList from "../../components/synonym_list";
import SpeakBar from "../../components/speak_bar";
import MyEnText from "../../components/def/myen";
import EnMyText from "../../components/def/enmy";
import OxfordText from "../../components/def/oxford";
import OrnagaiText from "../../components/def/ornagai";
import NotFoundResult from "../../components/notfound_result";
import { isMyanmar, MyanmarSyllableList } from "../../utils/myanmar";
export default function Result({ pass }) {


    const res = pass.data.result

    const word = decodeURIComponent(pass.word)


    if (res == null) {
        return (<NotFoundResult word={word}></NotFoundResult>)

    }

    const myanmar = isMyanmar(word)


    var syn = res.synonym
    if (myanmar && res.synonym == null) {
        syn = MyanmarSyllableList(res.myen)
        console.log(syn)
    }

    var spacing = 2
    var right = 10
    var showsyn = true
    if (syn == null || syn == undefined || syn.length == 0) {
        spacing = 0
        right = 12
        showsyn = false
    }

    return (
        <Container sx={{ pt: 1 }}>
            <h1>Ornagai</h1>
            <Stack>
                <SearchBar word={word}></SearchBar>
                <h1>{word}</h1>
                <SpeakBar word={word}></SpeakBar>
                <Grid container spacing={2}>
                    {
                        showsyn &&
                        <Grid xs={spacing}>
                            <SynonymList synonym={syn}></SynonymList>
                        </Grid>
                    }
                    <Grid xs={right}>
                        <MyEnText data={res.myen}></MyEnText>
                        <OrnagaiText data={res.ornagai}></OrnagaiText>
                        <EnMyText data={res.eng_mm}></EnMyText>
                        <OxfordText data={res.oxford}></OxfordText>
                    </Grid>
                </Grid>
            </Stack>
        </Container>

    )
}

export async function getServerSideProps(context) {
    const word = encodeURIComponent(context.query.word)


    const timestamp = Date.now()
    const app_id = process.env.APP_ID
    const key = process.env.APP_KEY
    const original_string = app_id + ":" + timestamp
    const hash = createHmac('sha1', key)
        .update(original_string)
        .digest('hex')

    const resp = await fetch(`${process.env.API_HOST}/result/${word}?timestamp=${timestamp}&hash=${hash}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'app_id': app_id
        }
    })
    const result = await resp.json()
    const pass = { word: word, data: result }
    return {
        props: {
            pass
        }
    }
}