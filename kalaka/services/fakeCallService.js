import * as Speech from 'expo-speech';

export const readText = (textToRead, startRecording) => {
    Speech.speak(textToRead);
    setTimeout(() => {
        startRecording();
    }, 30000)
    
}
