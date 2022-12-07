const SUITS = ['♠', '♣', '♥', '♦']
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

export default class Deck {
  constructor(cards = this._getFreshDeck()) {
    this.cards = cards
  }

  _getFreshDeck() {
    return SUITS.flatMap(suit => {
      return VALUES.map(value => {
        return new Card(suit, value)
      })
    })
  }

  get amountOfCards() {
    return this.cards.length
  }

  takeCard() {
    return this.cards.shift()
  }

  pushCards(cards) {
    return this.cards.push(...cards)
  }

  shuffle() {
    for (let i = this.amountOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1))

      const tmp = this.cards[newIndex]
      this.cards[newIndex] = this.cards[i]
      this.cards[i] = tmp
    }
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit
    this.value = value
  }

  get color() {
    return (this.suit === '♥' || this.suit === '♦') ? 'red' : 'black'
  }

  getHTML() {
    const cardElem = document.createElement('div')
    cardElem.innerText = `${this.value} ${this.suit}`
    cardElem.classList.add('card', this.color)
    return cardElem
  }

  compareTo(otherCard) {
    const cardInd = VALUES.indexOf(this.value)
    const otherCardInd = VALUES.indexOf(otherCard.value)

    if ((cardInd === 0 && otherCardInd === 12) || (cardInd === 12 && otherCardInd === 0)) {
      return otherCardInd - cardInd
    }

    return cardInd - otherCardInd
  }
}

