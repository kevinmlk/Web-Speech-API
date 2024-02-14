var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const speakBtn = document.querySelector('#speakBtn');
 
const recognition = new SpeechRecognition();
recognition.lang = 'nl-BE';
 
recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript;
  console.log(transcript);
  document.querySelector('#output').innerHTML += transcript + '<br>';
  speakBtn.disabled = false;
}
 
speakBtn.addEventListener('click', function () {
  recognition.start();
  speakBtn.disabled = true;
});