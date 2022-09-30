import { createHmac } from "crypto"
import Container from '@mui/material/Container';
import { useRouter } from 'next/router'
import Stack from '@mui/material/Stack';
import SearchBar from '../../components/search_bar'
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

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
    var synonymlist = []
    if (engmm != null) {
        engmm_text = engmm.map((value) => "<div class='engmm'><div class='def'>" + value.definition + "</div></div>").join()

        synonym = engmm.map((value) => {
            return value.synonym
        }).join(",")
        if(synonym != "," && synonym != "") {
            synonymlist = synonym.split(",")
        }
        
    }

    var spacing = 2
    var right = 10
    if (synonym == "") {
        spacing = 0
        right = 12
    }


    const router = useRouter()
    console.log(synonymlist)
    return (
        <Container sx={{ pt: 5 }}>

            <Stack>
                <SearchBar word={res.word}></SearchBar>
                <h1>{res.word}</h1>
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
                                            <ListItemButton onClick={(event) => router.push("/result/" + encodeURIComponent(val))}>
                                                <ListItemText primary={val}></ListItemText>
                                            </ListItemButton>
                                        </ListItem>)
                                    })
                                }

                            </List>
                        </nav>
                    </Grid>
                    <Grid xs={right}>
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
    return {
        props: {
            result
        }
    }
}