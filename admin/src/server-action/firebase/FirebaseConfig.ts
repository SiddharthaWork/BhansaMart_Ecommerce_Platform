import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyA8dPryBIdZ-u1aywclZ73vqS-1FlJrq18',
  authDomain: 'notification-f5de6.firebaseapp.com',
  projectId: 'notification-f5de6',
  storageBucket: 'notification-f5de6.firebasestorage.app',
  messagingSenderId: '352232158982',
  appId: '1:352232158982:web:6ab78e1337d038595a1087',
  measurementId: 'G-3G84XTT0Y9',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const token = `BNHwiiLMuGK9UjBkuaNalAqHCh-k-dIiVY_6raUv7Y5pVwM4C4SEr8BThOi7UuIsEmMJRvVJmuXEUfKJhumXzC4;`;

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);
