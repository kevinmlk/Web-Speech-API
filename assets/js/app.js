var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

// Btn's
const speakBtn = document.querySelector('#speak-button');
const startBtn = document.querySelector('#start-button');

// Article's and sections
const introSection = document.querySelector('#intro-section');

// Question articles
const quizQuestion1 = document.querySelector('#quiz-question-1');

// Answers container & list items
const answersContainer = document.querySelector('.answers-container');
const answerContainerItems = answersContainer.querySelectorAll('li');

// Answers
const answerQuestion1 = 'PRAGMATIC DREAMERS';
const answerQuestion2 = 'pragmatic dreamers';
const answerQuestion3 = 'pragmatic dreamers';
console.log(answerQuestion1);
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
 
recognition.onresult = function (event) {
  let transcript = event.results[0][0].transcript;
  let upperTranscript = transcript.toUpperCase();
  console.log('Ingesproken antwoord: ' + upperTranscript);
  
  document.querySelector('#output').innerHTML += upperTranscript;
  speakBtn.disabled = false;

  // Loop over list items to find the matching answer
  
  if (upperTranscript === answerQuestion1) {
    console.log('Match found!');
  }
};

// EventListeners
speakBtn.addEventListener('click', function () {
  recognition.start();
  speakBtn.disabled = true;
});

startBtn.addEventListener('click', function () {
  introSection.classList.add('hidden');
  quizQuestion1.classList.remove('hidden');
});
