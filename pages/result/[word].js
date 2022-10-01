import { createHmac } from "crypto"
import Container from '@mui/material/Container';
import { useRouter } from 'next/router'
import Stack from '@mui/material/Stack';
import SearchBar from '../../components/search_bar'
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import speak from "../../utils/speak"
import IconButton from '@mui/material/IconButton';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

export default function Result({ pass }) {


    const res = pass.data.result
    const word = decodeURIComponent(pass.word)


    if (res == null) {
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
    var oxford = res.oxford
    var oxford_text = ""
    if (oxford != null) {
        oxford_text = oxford.map((value) => "<div class='oxford'>" + value + "</div>").join()
    }

    var ornagai = res.ornagai
    var ornagai_text = ""
    if (ornagai != null) {
        ornagai_text = ornagai.map((value) => {
            if (value.def == "") {
                return ""
            }
            return `<div class='ornagai'>
             <div class='state'>${value.state}</div>
             <div class='def'>${value.def}</div>
             </div>
             `

        }).join("")
    }

    var engmm = res.eng_mm
    var engmm_text = ""
    var synonym = ""
    var synonymlist = res.synonym
    if(synonymlist == null || synonymlist == undefined) {
        synonymlist = []
    }
    

    var myen = res.my_en
    var myen_text = ""
    if(myen != "") {
        myen_text = ornagai.map((value) => {
            if (value.def == "") {
                return ""
            }
            return `<div class='myen'>
             <div class='phonetics'>/ ${value.phonetics} / ${value.state}</div>
             <div class='def'>${value.meaning}</div>
             </div>
             `

        }).join("")
    }

    var spacing = 2
    var right = 10
    if (synonym == "") {
        spacing = 0
        right = 12
    }


    const router = useRouter()

    return (
        <Container sx={{ pt: 1 }}>
            <h1>Ornagai</h1>
            <Stack>
                <SearchBar word={word}></SearchBar>
                <h1>{word}</h1>
                <span className="show-word">
                    <IconButton onClick={() => {
                        speak(word, "en-US")
                    }}>
                        <VolumeUpIcon />
                    </IconButton>
                    <span className='lang-name'>en-us</span>
                    <IconButton onClick={() => {
                        speak(word, "en-GB")
                    }}>
                        <VolumeUpIcon />
                    </IconButton>
                    <span className='lang-name'>en-GB</span>
                </span>



                <Grid container spacing={2}>
                    <Grid xs={spacing}>
                        {
                            synonymlist.length > 0 &&
                            <span className='synonym'>synonym</span>
                        }
                        <nav>
                            <List>
                                {
                                    synonymlist.map((val) => {
                                        return (<ListItem key={val} disablePadding>
                                            <ListItemButton onClick={(event) => router.push("/result/" + encodeURIComponent(val.trim()))}>
                                                <ListItemText primary={val}></ListItemText>
                                            </ListItemButton>
                                        </ListItem>)
                                    })
                                }

                            </List>
                        </nav>
                    </Grid>
                    <Grid xs={right}>
                    <div className="myen_data" dangerouslySetInnerHTML={{ __html: myen_text }}></div>
                        <div className="ornagai_data" dangerouslySetInnerHTML={{ __html: ornagai_text }}></div>
                        <div className="engmm_data" dangerouslySetInnerHTML={{ __html: engmm_text }}></div>
                        <div className="oxford_data" dangerouslySetInnerHTML={{ __html: oxford_text }}></div>
                    </Grid>
                </Grid>
            </Stack>
        </Container>

    )
}

export async function getServerSideProps(context) {
    const word = encodeURIComponent(context.query.word)


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
    const pass = { word: word, data: result }
    return {
        props: {
            pass
        }
    }
}