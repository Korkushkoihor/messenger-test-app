import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideFirebaseApp} from '@angular/fire/app';
import {initializeApp} from 'firebase/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBhJE_AXXzCZA5RqUI5wkz4wzrQ7dxxXAg",
  authDomain: "messenger-test-app-3d909.firebaseapp.com",
  projectId: "messenger-test-app-3d909",
  storageBucket: "messenger-test-app-3d909.firebasestorage.app",
  messagingSenderId: "88466192469",
  appId: "1:88466192469:web:62350d31326ba01f92fcdc",
  measurementId: "G-G9G8CXTL4B"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ]
};
