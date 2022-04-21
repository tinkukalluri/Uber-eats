import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc, addDoc, removeDoc } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration

// Get a list of cities from your database
// https://firebase.google.com/docs/web/setup#access-firebase
// async function getCities(db) {
//     const citiesCol = collection(db, 'cities');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
// }

const firebaseConfig = {
    apiKey: "AIzaSyBAQDGnlrirKJgl2ziTzb1LMIVNUREG3IM",
    authDomain: "rn-uber-eats-clone-60632.firebaseapp.com",
    projectId: "rn-uber-eats-clone-60632",
    storageBucket: "rn-uber-eats-clone-60632.appspot.com",
    messagingSenderId: "44870660620",
    appId: "1:44870660620:web:7530f3a7d9a72fb957b429",
    measurementId: "G-7BRNDB8GYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);


// export const addOrderToFireBase = async (items, restaurantName) => {
//     const ordersCollection = collection(db, 'orders')
//     const docRef = await addDoc(ordersCollection, {
//         items: items,
//         restaurantName: restaurantName,
//         createdAt: "10"
//     })
//     console.log(docRef)
// };


export default db;