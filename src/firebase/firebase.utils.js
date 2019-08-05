import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAZKyL2wWklOY_r2md5B2XuOf1Wy6ikKi4",
    authDomain: "e-shop-db-rk.firebaseapp.com",
    databaseURL: "https://e-shop-db-rk.firebaseio.com",
    projectId: "e-shop-db-rk",
    storageBucket: "",
    messagingSenderId: "466352371087",
    appId: "1:466352371087:web:5097238bc30c19e8"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return ;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (err) {
            console.log('error error', err.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;