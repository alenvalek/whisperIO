import firebase from 'firebase/app'
import "firebase/auth"

// web app's Firebase configuration && initialization
const app = firebase.initializeApp ({
    apiKey: "AIzaSyB3yynGltTaDa11_AI2sEDXTUZemGVlhxg",
    authDomain: "lfg-project-f63b2.firebaseapp.com",
    projectId: "lfg-project-f63b2",
    storageBucket: "lfg-project-f63b2.appspot.com",
    messagingSenderId: "586410041256",
    appId: "1:586410041256:web:c97d540fb4560c8fbe479d"
})

export const auth = app.auth()
export default app