const readlineSync = require('readline-sync');
const chalk = require('chalk')

let questions = [
  {
    question: 'What is my favourite color ?\nAns: ',
    correctAnswer: ['blue'],
    answerType: 'string'
  },
  {
    question: 'What\'s my favourite programming language ?\nAns: ',
    correctAnswer: ['js', 'javascript'],
    answerType: 'string'
  },
  {
    question: 'What is my favourite TV Show ?\nAns: ',
    correctAnswer: ['doctor who', 'brooklyn nine nine', 'brooklyn 99'],
    answerType: 'string',
  },
  {
    question: 'True or False: I like Star Wars.\nAns: ',
    correctAnswer: [false],
    answerType: 'boolean',
  },
  {
    question: 'What is the third fibonacci number ?\nAns: ',
    correctAnswer: [2],
    answerType: 'number',
  }
]

let score = 0

const askQuestion = (question, answerType) => {
  let answer = readlineSync.question(question)
  if (answerType === 'string') {
    return answer.toLowerCase()
  }
  else if (answerType === 'number') {
    return parseInt(answer)
  }
  else if (answerType === 'boolean') {
    if (answer.toLowerCase() == 'false') return false
    else return true
  }
}

const checkAnswer = (answer, correctAnswer) => {
  let arr = correctAnswer.filter(cur => answer == cur)
  if (arr[0] !== undefined) {
    console.log(chalk.green('Correct! '))
    return true
  }
  else {
    console.log(chalk.red('Wrong Answer!'))
    return false
  }
}

const updateScore = (isCorrect, isFinalQuestion) => {
  if (isCorrect) {
    score++
  }
  if (isFinalQuestion) {
    console.log(`Final Score: ${score}. Thanks for playing!\n\n`)
    let replay = readlineSync.question('Do you want to play again (Y / N) ?\nAns: ')
    if (replay.toLowerCase() === 'y') {
      console.log('\n')
      startQuiz()
    }
    return
  }
  console.log(`Score: ${score}\n`)
}

const startQuiz = () => {
  questions.forEach(({ question, correctAnswer, answerType }, index) => {
    let answer = askQuestion(question, answerType)
    let isCorrect = checkAnswer(answer, correctAnswer)
    updateScore(isCorrect, index === questions.length - 1)
  })
}

startQuiz()