var username = document.querySelectorAll('#username')
var saveScoreBtn = document.querySelectorAll('#saveScoreBtn')
var finalScore = document.querySelectorAll('#finalScore')
var mostRecentScore = document.querySelectorAll('#mostRecentScore')

var highScores = JSON.parse(localStorage.getItem('hignScores')) || []

var MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

// whenever key is released, reenable the save button
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault ()

    var score = {
        score: mostRecentScore,
        name: username.value, 
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}