import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useRouter } from 'next/router'

export default function SynonymList({ synonym }) {
    const router = useRouter()
    if(synonym == null || synonym == undefined) {
        synonym = []
    }
    return (
        <div>
            {
                 synonym.length > 0 &&
                <span className='synonym'>synonym</span>
            }
            <nav>
                <List>
                    {
                        synonym.map((val,index) => {
                            return (<ListItem key={"syn_" + index} disablePadding>
                                <ListItemButton onClick={(event) => router.push("/result/" + encodeURIComponent(val.trim()))}>
                                    <ListItemText primary={val}></ListItemText>
                                </ListItemButton>
                            </ListItem>)
                        })
                    }

                </List>
            </nav>
        </div>
    )
}