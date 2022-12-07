import Deck from "./deck&card.js";

const computerDeckHTML = document.querySelector('.computer-deck')
const playerDeckHTML = document.querySelector('.player-deck')
const playerSlots = document.querySelector('.player-slots')
const computerSlots = document.querySelector('.computer-slots');
const text = document.querySelector('.text');

let playerDeck, computerDeck;
let playerCards = [];
let computerCards = [];
let isRound = false;

(function start() {
  const deck = new Deck()
  deck.shuffle()

  const mid = Math.ceil(deck.amountOfCards / 2)
  playerDeck = new Deck(deck.cards.slice(0, mid))
  computerDeck = new Deck(deck.cards.slice(mid, deck.amountOfCards))

  updateAmount()
})()


playerDeckHTML.addEventListener('click', async () => {
  if(isRound) return
  isRound = true
  let shouldStop
  do{
    const {playerCard, computerCard} = await round()
    shouldStop = await judge(playerCard, computerCard)
  } while(!shouldStop)

  if(playerDeck.amountOfCards === 0 || computerDeck.amountOfCards === 0){
    endGame()
  }
  isRound = false
})

async function judge(playerCard, computerCard) {
  const compare = playerCard.compareTo(computerCard)
  if (compare > 0) {
    playerDeck.pushCards([...playerCards, ...computerCards])
    text.innerHTML = 'win'
  } else if (compare < 0) {
    computerDeck.pushCards([...playerCards, ...computerCards])
    text.innerHTML = 'lose'
  } else {
    return false
  }
  clear()
  updateAmount()

  playerCards = []
  computerCards = []
  return true
}

async function round()
{
  playerCards.push(playerDeck.takeCard())
  let playerCard = playerCards[playerCards.length - 1]
  playerSlots.appendChild(playerCard.getHTML())

  updateAmount()
  await delay(500)

  computerCards.push(computerDeck.takeCard())
  let computerCard = computerCards[computerCards.length - 1]
  computerSlots.appendChild(computerCard.getHTML())

  updateAmount()
  await delay(1000)
  
  return {playerCard, computerCard}
}

function updateAmount(){
  playerDeckHTML.innerHTML = playerDeck.amountOfCards
  computerDeckHTML.innerHTML = computerDeck.amountOfCards
}

function clear() {
  playerSlots.innerHTML = ''
  computerSlots.innerHTML = ''
}

function endGame() {
  const body = document.querySelector('body')
  if(playerDeck.amountOfCards === 0){
    body.innerHTML = `<h1>You lose!!!</h1>`
  } else {
    body.innerHTML = `<h1>You won!!!</h1>`
  }
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}