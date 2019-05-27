import { 
    RECEIVE_DECKS, 
    CREATE_DECK, 
    DELETE_DECK,
    CREATE_CARD } from '../actions'

function decks(state = {}, action) {
    switch(action.type){
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case CREATE_DECK:
            return {
                ...state,
                [action.deckName]: {
                    title: action.deckName,
                    questions: []
                }
            }
        case DELETE_DECK:
            let modifiedState = {...state}
            delete modifiedState[action.deckName]
            return modifiedState
        case CREATE_CARD:
            return {
                ...state,
                [action.deckName]: {
                    ...state[action.deckName],
                    questions: [
                        ...state[action.deckName].questions,
                        {
                            question: action.question,
                            answer: action.answer
                        }
                    ]
                }
            }
        default:
            return state
    }
}

export default decks