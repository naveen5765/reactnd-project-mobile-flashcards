export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const CREATE_DECK = 'CREATE_DECK'

export const receiveDecks = (decks) => ({
  type: RECEIVE_DECKS,
  decks
})

export const createDeck = (deckName) => ({
  type: CREATE_DECK,
  deckName
})
