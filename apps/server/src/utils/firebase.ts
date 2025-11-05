import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { env } from './env';

export const firebaseApp = initializeApp({
  credential: cert({
    projectId: env.FIREBASE_PROJECT_ID,
    privateKey: env.FIREBASE_GOOGLE_APPLICATION_PRIVATE_KEY,
    clientEmail: env.FIREBASE_GOOGLE_APPLICATION_CLIENT_EMAIL,
  }),
  projectId: env.FIREBASE_PROJECT_ID,
});

export const firebaseAuth = getAuth(firebaseApp);
