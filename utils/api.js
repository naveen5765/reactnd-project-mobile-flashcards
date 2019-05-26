import { AsyncStorage } from 'react-native';

export const FLASHCARD_STORAGE_KEY = 'UdaciFlashCards:FlashCards';

export const retrieveDecksFromPhoneStorage = () => {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then(results => {
            return JSON.parse(results);
    });
};

export const saveDeckInPhoneStorage = (deckName) => {
    return AsyncStorage.mergeItem(
        FLASHCARD_STORAGE_KEY,
        JSON.stringify({ [deckName]: {title:deckName, questions:[]}})
      );
}