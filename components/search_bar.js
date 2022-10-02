import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { createHmac } from "crypto"
export default function SearchBar({ word }) {
    
    const [wordList, setWordList] = useState([])
    const [value, setValue] = useState(word)
    const router = useRouter()

    return (
        <Autocomplete
            id="Dictionary"

            onChange={(event, newValue) => {
                
                if(newValue != undefined) {
                    router.push("/result/" + encodeURIComponent(newValue))
                }
            }
            }
            value={value}
            onInputChange={(event, newValue) => {

                setValue(newValue)
                
                if (newValue.trim() != "") {
                    const timestamp = Date.now()
                    const app_id = process.env.APP_ID
                    const key = process.env.APP_KEY
                    const original_string = app_id + ":" + timestamp
                    const hash = createHmac('sha1', key)
                        .update(original_string)
                        .digest('hex')
                    
                    const url = process.env.API_HOST + `/search/${newValue}?timestamp=${timestamp}&hash=${hash}`
                    console.log(url)
                    fetch(url, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'app_id': app_id
                        },
                    }).then((response) => {
                        //setWordList(response.result)
                        
                        response.json().then((value) => {
                            if(value.result != undefined) {
                                setWordList(value.result)
                            }
                        })
                    })
                }

                
            }}
            options={wordList}
            
            renderInput={(params) => <TextField {...params} label="Enter text to search" onKeyDown={e => {
                console.log(e.code.toLowerCase())
                if (e.code.toLowerCase() === 'enter' && e.target.value) {
                    router.push("/result/" + encodeURIComponent(e.target.value))
                }
              }} />}
        />
    )
}