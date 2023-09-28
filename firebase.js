import { initializeApp, credential as _credential, firestore } from 'firebase-admin';
import serviceAccount from './serviceKey.json';

initializeApp({
  credential: _credential.cert(serviceAccount)
});

const db = firestore();

export default { db };
