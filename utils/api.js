import { AsyncStorage } from 'react-native';

export const FLASHCARD_STORAGE_KEY = 'UdaciFlashCards:FlashCards';

export const retrieveDecksFromPhoneStorage = () => {
    // AsyncStorage.removeItem(FLASHCARD_STORAGE_KEY)
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then(decks => {
            return JSON.parse(decks)
    });
};

export const saveDeckInPhoneStorage = (deckName) => {
    return AsyncStorage.mergeItem(
        FLASHCARD_STORAGE_KEY,
        JSON.stringify({ [deckName]: {title:deckName, questions:[]}})
      );
}

export const removeDeckInPhoneStorage = (deckName) => {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then(decks => {
            const data = JSON.parse(decks)

            data[deckName] = undefined
            delete data[deckName]
            
            AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
        })
}

export const saveCardInPhoneStorage = (deckName, question, answer) => {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then(decks => {
            const data = JSON.parse(decks)

            data[deckName] = {
                ...data[deckName],
                questions: [
                    ...data[deckName].questions,
                    {
                        question: question,
                        answer: answer
                    }
                ]
            }

            AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
        })
}