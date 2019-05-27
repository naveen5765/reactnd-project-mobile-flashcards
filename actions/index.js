export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const CREATE_DECK = 'CREATE_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const CREATE_CARD = 'CREATE_CARD'

export const receiveDecks = (decks) => ({
  type: RECEIVE_DECKS,
  decks
})

export const createDeck = (deckName) => ({
  type: CREATE_DECK,
  deckName
})

export const deleteDeck = (deckName) => ({
  type: DELETE_DECK,
  deckName
})

export const createCard = (deckName, question, answer) => ({
  type:CREATE_CARD,
  deckName,
  question,
  answer
})
