// letters
const letters = 'abcdefghijklmnopqrstuvwxyz'

// get array from letters
let lettersArray = Array.from(letters)

// select letters container
let lettersContainer = document.querySelector('.letters')

// generate letters
lettersArray.forEach((letter) => {
  // create span
  let span = document.createElement('span')

  // create letter text node
  let theLetter = document.createTextNode(letter)

  // append theletter to span
  span.appendChild(theLetter)

  // add class on span
  span.className = 'letter-box'

  // append span to the letters container
  lettersContainer.appendChild(span)
})

// object of words + categories
const words = {
  programming: [
    'php',
    'javascript',
    'go',
    'scala',
    'fortran',
    'r',
    'mysql',
    'python',
  ],
  movies: [
    'Prestige',
    'Inception',
    'Parasite',
    'Interseteller',
    'Whiplash',
    'Memento',
    'Coco',
    'Up',
  ],
  people: [
    'Albert Einstein',
    'Hitchcock',
    'Alexander',
    'Cleopatra',
    'ElKhawarezmi',
  ],
  countries: [
    'Egypt',
    'Syria',
    'Yemen',
    'Palestine',
    'Bahrain',
    'lebanon',
    'Qator',
  ],
}

// get random property
let allKeys = Object.keys(words)

// random number depend on keys
let randomPropNumber = Math.floor(Math.random() * allKeys.length)
// category
let randomPropName = allKeys[randomPropNumber]
// category words
let randomPropValue = words[randomPropName]

// random number depend on words of category
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length)
// the random chosen word
let randomValueName = randomPropValue[randomValueNumber]

// set category info
let categorySpan = document.querySelector('.category span')
categorySpan.innerHTML = randomPropName

// select letters guess
let lettersGuess = document.querySelector('.letters-guess')

// convert chosen word to array
let lettersAndSpace = Array.from(randomValueName)

// create spans depend on word
lettersAndSpace.forEach((letter) => {
  // create empty span
  let emptySpan = document.createElement('span')

  // if the letter is space
  if (letter === ' ') {
    // add class to the span
    emptySpan.className = 'white-space'
  }

  // append span to letters guess container
  lettersGuess.appendChild(emptySpan)
})

// select guess letters span
let guessLettersSpan = document.querySelectorAll('.letters-guess span')

// set wrong attempts
let wrongAttempts = 0

// select draw element
let theDraw = document.querySelector('.hangman-draw')
// handle clicking on letters
document.addEventListener('click', (e) => {
  // set the choose status
  let theStatus = false
  if (e.target.className === 'letter-box') {
    e.target.classList.add('clicked')

    // get clicked letter
    let theClickedLetter = e.target.innerHTML.toLowerCase()

    // the chosen word

    // console.log(lettersAndSpace) // the chosen word
    // chosen word
    let chosenWord = Array.from(randomValueName.toLowerCase())
    chosenWord.forEach((wordLetter, wordIndex) => {
      // if the clicked letter equal to one of the chosen word letter
      if (theClickedLetter == wordLetter) {
        // set the status to correct
        theStatus = true
        // loop on all guess span
        guessLettersSpan.forEach((span, spanIndex) => {
          if (wordIndex == spanIndex) {
            span.classList.add('done')
            span.innerHTML = theClickedLetter
          }
        })
      }
    })

    // if the letter is wrong
    if (theStatus !== true) {
      // increase wrong attempts
      wrongAttempts++

      // add class wrong on the draw element
      theDraw.classList.add(`wrong-${wrongAttempts}`)

      // play fail sound
      document.getElementById('fail').play()

      if (wrongAttempts == 8) {
        endGame()
        lettersContainer.classList.add('finished')
      }
    } else {
      // play success sound
      document.getElementById('success').play()
    }
  }

  if (document.querySelectorAll('.done').length == lettersAndSpace.length) {
    let successPopup = document.createElement('div')
    let level
    successPopup.className = 'success-popup'
    if (wrongAttempts >= 0 && wrongAttempts < 3) {
      level = 'Excellent'
    } else if (wrongAttempts > 2 && wrongAttempts < 6) {
      level = 'Meduim'
    } else if (wrongAttempts > 5 && wrongAttempts < 9) {
      level = 'Weak'
    }
    let successPopupText = document.createTextNode(
      `Congratulations !!, Your Level Is ${level} `,
    )

    // append btn text to button
    let button = document.createElement('button')
    let buttonText = document.createTextNode('Play Again')
    button.appendChild(buttonText)

    // append text and button to popup

    successPopup.appendChild(successPopupText)
    successPopup.appendChild(button)

    // append popup to body
    document.body.appendChild(successPopup)

    // start again
    button.addEventListener('click', function () {
      setTimeout(() => {
        location.reload()
      }, 1000)
    })
  }
})

// end game function
function endGame() {
  // create popup
  let popup = document.createElement('div')
  let button = document.createElement('button')
  let buttonTxt = document.createTextNode('Play Again')
  let popupText = document.createTextNode(
    `Game Over, The Correct Word Is ${randomValueName}`,
  )
  // append btn text to button
  button.appendChild(buttonTxt)

  // append text and button to popup
  popup.appendChild(popupText)
  popup.appendChild(button)

  // add class on div
  popup.className = 'popup'

  // append popup to body
  document.body.appendChild(popup)

  // start again
  button.addEventListener('click', function () {
    setTimeout(() => {
      location.reload()
    }, 1000)
  })
}
