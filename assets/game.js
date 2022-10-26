var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');
// timer stuff
var timeEl = document.querySelector('#timeLeft');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

// This is where the questions will be put
let questions = [
    {
        question: 'JavaScript is a ____ - side programming language.',
        choice1: 'Client',
        choice2: 'Client and Server',
        choice3: 'Server',
        choice4: 'None',
        answer: 2,
        // the correct answer is choice 2, answer = choice "2"
    },
    {
        question: 'What does "JS" stand for?',
        choice1: 'JavaScript',
        choice2: 'James Smith',
        choice3: 'Jerkey Stew',
        choice4: 'Jig Saw',
        answer: 1,
        // the correct answer is choice 1, answer = choice "1"
    },
    {
        question: 'Which of the following is written in "Camel case"?',
        choice1: 'HELLO WORLD',
        choice2: 'Hello World',
        choice3: 'helloWorld',
        choice4: 'helloworld',
        answer: 3,
        // the correct answer is choice 3, answer = choice "3"
    },
    {
        question: 'Which are the correct “if” statements to execute certain code if “x” is equal to 2?',
        choice1: 'if(x=2)',
        choice2: 'if(x!=2)',
        choice3: 'if(x2)',
        choice4: 'if(x==2)',
        answer: 4,
        // the correct answer is choice 4, answer = choice "4"
    }
]
var SCORE_POINTS = 100
var MAX_QUESTIONS = 4

// timer stuff 
var secondsLeft = 100;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
 
   timeEl.textContent = secondsLeft 
    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      
      localStorage.setItem('mostRecentScore', score)
      return window.location.assign('./end.html')
    }

  }, 1000);
}


startGame = () => {
    questionCounter = 0
    score = 0 
    // questions come from the array above
    availableQuestions = [...questions]
    getNewQuestion()
    setTime()
}

// check the || if something breaks in js for now!!!!!!!! 10/24 'questionCounter
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    // counts which questions you are currently on i.e 1/4 
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        var number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        var selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        // time decreased every time incorrect answer is picked  
        if(classToApply === 'incorrect') {
            secondsLeft -= 25;
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout (() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame ()
