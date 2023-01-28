import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase.config';
import { getAuth } from 'firebase/auth';
import { getFirestore} from "firebase/firestore";


const app = initializeApp(getFirebaseConfig());
export const auth = getAuth(app)
const db = getFirestore(app);





export { db }