var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

// Btn's
const speakBtn = document.querySelector('.speak-button');
const startBtn = document.querySelector('#start-button');
const nextBtn = document.querySelector('.next-question-button');

// Article's and sections
const introSection = document.querySelector('#intro-section');
const quizSection = document.querySelector('#quiz-section');

// Question articles
const quizQuestion1 = document.querySelector('#quiz-question-1');
const quizQuestion2 = document.querySelector('#quiz-question-2');
const quizQuestion3 = document.querySelector('#quiz-question-3');

// Answers container & list items
const answersContainer = document.querySelector('.answers-container');
const succesMessageContainer = document.querySelector('.succes-message-container');

// Answers
const answerQuestion1 = 'PRAGMATIC DREAMERS';
const answerQuestion2 = 'OUR VERY OWN PROGRESS';
const answerQuestion3 = 'ALL INCLUSIVE';

// Current question
let currentQuestion = 0;

// Speech recognition
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
 
recognition.onresult = function (event) {
  let transcript = event.results[0][0].transcript;
  let upperTranscript = transcript.toUpperCase();
  console.log('Ingesproken antwoord: ' + upperTranscript);
  
  document.querySelector('.output').textContent = 'Ingesproken antwoord: ' + upperTranscript;
  speakBtn.disabled = false;

  // Loop over list items to find the matching answer
  if (upperTranscript === answerQuestion1 || upperTranscript === answerQuestion2 || upperTranscript === answerQuestion3) {
    console.log('Match found!');
    succesMessageContainer.classList.remove('hidden');
  } else {
    console.log('No match found...');
  }
};

// Show the current question
const showCurrentQuestion = () => {
  // Add int based on current question
  currentQuestion++;
  console.log(currentQuestion);
  if (currentQuestion === 1) {
    introSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
  } else if (currentQuestion === 2) {
    quizQuestion1.classList.add('hidden');
    quizQuestion2.classList.remove('hidden');
  } else {
    quizQuestion2.classList.add('hidden');
    quizQuestion3.classList.remove('hidden');
  }

  // Hide succes message
  if (!succesMessageContainer.classList.contains('hidden')) {
    succesMessageContainer.classList.add('hidden');
  }
}

// EventListeners
speakBtn.addEventListener('click', () => {
  recognition.start();
  speakBtn.disabled = true;
});

startBtn.addEventListener('click', showCurrentQuestion);

nextBtn.addEventListener('click', showCurrentQuestion);
