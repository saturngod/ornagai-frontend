 function Speak(text, lang) {

     const message = new SpeechSynthesisUtterance(
         text
     );
     message.lang = lang;

     const voices = speechSynthesis
         .getVoices()
         .filter(voice => (voice.lang === lang && voice.name.substring(0, 4) == "Reed"));
     message.voice = voices[0];
     message.rate = 0.8;

     speechSynthesis.speak(message);
 }

 export default Speak