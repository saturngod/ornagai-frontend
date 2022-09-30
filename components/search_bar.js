import Autocomplete from '@mui/material/Autocomplete';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { createHmac } from "crypto"
export default function SearchBar({ word }) {

    const [wordList, setWordList] = useState([])
    const [value, setValue] = useState(word)
    const router = useRouter()

    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {

        if (searchValue.trim() != "") {
            const timestamp = Date.now()
            const app_id = "23321321"

            const key = "69722703123"
            const original_string = app_id + ":" + timestamp
            const hash = createHmac('sha1', key)
                .update(original_string)
                .digest('hex')


            fetch(`http://localhost:3000/api/search/${searchValue}?timestamp=${timestamp}&hash=${hash}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'app_id': app_id
                },
            }).then((response) => {
                //setWordList(response.result)
                response.json().then(value => setWordList(value.result))
            })
        }
    })

    return (
        <Autocomplete
            id="Dictionary"

            onChange={(event, newValue) => {
                router.push("/result/" + newValue)
            }
            }
            value={value}
            onInputChange={(event, newValue) => {
                setSearchValue(newValue)
            }}
            options={wordList}

            renderInput={(params) => <TextField {...params} label="Dictionary" />}
        />
    )
}