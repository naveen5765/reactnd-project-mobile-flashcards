import { RECEIVE_DECKS, CREATE_DECK } from '../actions'

function decks(state = {}, action) {
    switch(action.type){
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case CREATE_DECK :
            debugger;
            return {
                ...state,
                [action.deckName]: {
                    title: action.deckName,
                    questions: []
                }
            }
        default:
            return state
    }
}

export default decks