import { AsyncStorage } from 'react-native';

export const FLASHCARD_STORAGE_KEY = 'UdaciFlashCards:FlashCards';

export const retrieveDecksFromPhoneStorage = () => {
    AsyncStorage.removeItem(FLASHCARD_STORAGE_KEY)
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then(decks => {
            return JSON.parse(decks);
    });
};

export const saveDeckInPhoneStorage = (deckName) => {
    return AsyncStorage.mergeItem(
        FLASHCARD_STORAGE_KEY,
        JSON.stringify({ [deckName]: {title:deckName, questions:[]}})
      );
}