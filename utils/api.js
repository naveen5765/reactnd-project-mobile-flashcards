import { AsyncStorage } from 'react-native';

export const FLASHCARD_STORAGE_KEY = 'UdaciFlashCards:FlashCards';

export const retrieveDecks = () => {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(results => {
        return JSON.parse(results);
    });
};