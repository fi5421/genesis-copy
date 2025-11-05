import { initializeApp, getApp, getApps, FirebaseOptions } from 'firebase/app';
import { env } from './env';

import {
  EmailAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
  validatePassword as firebaseValidatePassword,
} from 'firebase/auth';
import { toast } from 'sonner';

const firebaseConfig: FirebaseOptions = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
};

export const firebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
export const firebaseEmailPasswordAuth = new EmailAuthProvider();
export const firebaseGoogleAuth = new GoogleAuthProvider();

export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password,
  );
  return userCredential.user;
};

export const signInWithGoogle = async () => {
  if (!env.VITE_ENABLE_SIGN_UP_WITH_GOOGLE) {
    toast.error('Google authentication is not enabled');
    return;
  }

  const userCredential = await signInWithPopup(
    firebaseAuth,
    firebaseGoogleAuth,
  );
  return userCredential.user;
};

export const signUp = async (name: string, email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password,
  );

  await updateProfile(userCredential.user, {
    displayName: name,
  });

  return userCredential.user;
};

export const signOut = async () => {
  await firebaseAuth.signOut();
};

export const onAuthStateChange = (
  callback: (user: FirebaseUser | null) => void,
) => {
  return onAuthStateChanged(firebaseAuth, callback);
};

export const validatePassword = async (password: string) => {
  return firebaseValidatePassword(firebaseAuth, password);
};

export const getAuthToken = async () => {
  const user = await firebaseAuth.currentUser;
  if (!user) {
    throw new Error('No authenticated user');
  }
  return await user.getIdToken();
};
