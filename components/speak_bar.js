import speak from "../utils/speak"
import IconButton from '@mui/material/IconButton';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ismyanmar from "../utils/myanmar";

export default function SpeakBar({ word }) {

    if(ismyanmar(word)) {
        return (<span></span>)
    }
    return (
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
    )
}