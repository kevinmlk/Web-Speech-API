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
const answerQuestion1 = 'pragmatic dreamers';
const answerQuestion2 = 'pragmatic dreamers';
const answerQuestion3 = 'pragmatic dreamers';
 
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
 
recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript;
  console.log(transcript);
  document.querySelector('#output').innerHTML += transcript + '<br>';
  speakBtn.disabled = false;
}

// EventListeners
speakBtn.addEventListener('click', function () {
  recognition.start();
  speakBtn.disabled = true;
});

startBtn.addEventListener('click', function () {
  introSection.classList.add('hidden');
  quizQuestion1.classList.remove('hidden');
});
