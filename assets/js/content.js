'use strict';

const global = {
  recognition: new (window.SpeechRecognition || window.webkitSpeechRecognition)(),
  utterance: new SpeechSynthesisUtterance(),
  currentQuestion: 0,
  queries: [
    {
      question: "We doen er alles aan om dromen werkelijkheid te laten worden. Onze verbeeldingskracht is rebels en limietloos.",
      answers: [
        "We are full of respect",
        "Pragmatic dreamers",
        "Determined to not do basic"
      ],
      correctIndex: 1
    },
    {
      question: "Door af te wachten gaan we er niet geraken, eigen initiatieven nemen it is!",
      answers: [
        "Our very own progress",
        "One hell of a team",
        "We are digital experience design"
      ],
      correctIndex: 0
    },
    {
      question: "We got it all. Creativiteit, technische vaardigheden en soft skills gaan hand in hand. Design-development, win-win",
      answers: [
        "We are full of respect",
        "Always in for a challenge",
        "All-inclusive"
      ],
      correctIndex: 2
    },
  ]
}

const setup = () => {
  // Change properties
  global.recognition.lang = 'en-US';
  global.utterance.lang = 'nl-BE';
  global.utterance.pitch = 1.2;
  global.utterance.rate = .9;
 
  // Btn's
  const speakBtn = document.querySelector('.speak-button');
  const startBtn = document.querySelector('#start-button');
  const nextBtn = document.querySelector('.next-question-button');

  // EventListeners
  speakBtn.addEventListener('click', startSpeakRecognition);
  startBtn.addEventListener('click', showCurrentQuestion);
  nextBtn.addEventListener('click', nextQuestion);
  window.speechSynthesis.addEventListener('voiceschanged', handleVoiceChanged);
  global.recognition.addEventListener('result', handleSpeechResult);
  global.recognition.addEventListener('audioend', handleSpeechAudioEnd);
  global.recognition.addEventListener('error', handleSpeechError);
}

const startSpeakRecognition = () => {
  // Btn element
  const speakBtn = document.querySelector('.speak-button');

  // Reset answer
  document.querySelector('.output').textContent = 'Ingesproken antwoord: ';
  document.querySelector('.output').classList.remove('green-text');
  document.querySelector('.output').classList.remove('red-text');

  global.recognition.start();
  speakBtn.disabled = true;
}

const matchVoiceToLang = (voice) => {
  if (voice.lang === global.utterance) {
    return true;
  } {
    return false;
  }
}

const showCurrentQuestion = () => {
  // Elements
  const quizQuestion = document.querySelector('#quiz-question');
  const questiontext = document.querySelector('#text-question');
  const answers = document.querySelector('.answers-container');
  
  // Load question content in DOM
  quizQuestion.firstElementChild.textContent = "Vraag " + (global.currentQuestion + 1);
  questiontext.textContent = global.queries[global.currentQuestion].question;
  answers.replaceChildren("");
  global.queries[global.currentQuestion].answers.forEach((a) => {
    const answer = document.createElement('li');
    answer.textContent = a;
    answers.insertAdjacentElement('beforeend', answer);
  })

  // Hide intro and show question
  hideIntro();
  
  // Enable speech
  global.utterance.text = global.queries[global.currentQuestion].question;
  console.log(global.utterance);
  window.speechSynthesis.speak(global.utterance);
  
  // Reset answer
  document.querySelector('.output').textContent = 'Ingesproken antwoord: ';
  document.querySelector('.output').classList.remove('green-text');
  document.querySelector('.output').classList.remove('red-text');
}

const hideIntro = () => {
  // Elements
  const introSection = document.querySelector('#intro-section');
  const quizSection = document.querySelector('#quiz-section');
  
  introSection.classList.add('hidden');
  quizSection.classList.remove('hidden');
}

const nextQuestion = () => {
  // Check if there are still questions left
  if(global.currentQuestion + 1 < global.queries.length) {
    global.currentQuestion++;
    showCurrentQuestion();
    toggleSuccesMessage();
  }
}

const validateAnswer = (answer) => {
  // Get global questions
  const currentQuery = global.queries[global.currentQuestion];
  const currentAnswer = currentQuery.answers[currentQuery.correctIndex];

  // Show succesMessage if correct
  if (answer == currentAnswer.toUpperCase()) {
    document.querySelector('.output').classList.add('green-text');
    toggleSuccesMessage();
    console.log('Match found');
  } else {
    // color answer
  document.querySelector('.output').classList.add('red-text');
    console.log('Match false');
  }
}

const toggleSuccesMessage = () => {
  // Elements
  const succesMessageContainer = document.querySelector('.succes-message-container');
  const succesBtn = document.querySelector('.next-question-button');

  // toggle hidden
  succesMessageContainer.classList.toggle('hidden');

  // Hide next button if there are no more questions
  if(global.currentQuestion + 1 == global.queries.length) {
    succesBtn.classList.add('hidden');
  }
}

const handleVoiceChanged = () => {
  let voices = window.speechSynthesis.getVoices().filter(matchVoiceToLang);
  console.log('voices');
  global.utterance.voice = voices[3];
}

const handleSpeechResult = (event) => {
  // Btn element
  const speakBtn = document.querySelector('.speak-button');

  let transcript = event.results[0][0].transcript;
  let upperTranscript = transcript.toUpperCase();
  console.log('Ingesproken antwoord: ' + upperTranscript);
  global.recognition.stop();
  
  document.querySelector('.output').textContent = 'Ingesproken antwoord: ' + upperTranscript;
  speakBtn.disabled = false;
  
  validateAnswer(upperTranscript);
}

const handleSpeechAudioEnd = () => {
  // Btn element
  const speakBtn = document.querySelector('.speak-button');

  speakBtn.disabled = false;
}

const handleSpeechError = (error) => {
  // Btn element
  const speakBtn = document.querySelector('.speak-button');

  speakBtn.disabled = false;
  console.log(error);
}

window.addEventListener("DOMContentLoaded", setup);

