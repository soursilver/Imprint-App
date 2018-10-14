import { firebaseConfig } from '../../environment';
import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);
desp: String;

export const importTest = 'I am a test that shows you have successfully imported a .js file';

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true,
});

// CREATE A DOCUMENT ID IN DB AND INPUT FIELDS
export function newEntry() {
//  desp = document.getElementById('desp').value;
  db.collection('Entries').add({
    Order: 1,
    Start_Time: firebase.firestore.FieldValue.serverTimestamp(),
    Description: this.desp,
  })
    .then(function(docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
  // CHANGE ORDER OF PREVIOUS ENTRY
  db.collection('Entries').where('Order', '>=', 2)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        db.collection('Entries').doc(doc.id).update({
          Order: doc.data().Order + 1
        });
      });
    });
}

// RECORD END TIME AND CHANGE ORDER
export function closeEntry(dur) {
  db.collection('Entries').where('Order', '==', 1)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id);
        // let dur = document.getElementById('elap').innerHTML;
        console.log(dur);
        db.collection('Entries').doc(doc.id).update({
          Order: 2,
          Stop_Time: firebase.firestore.FieldValue.serverTimestamp(),
          Duration: dur
        });
      });
    })
    .catch(function(error) {
      console.log('Error getting documents: ', error);
    });
}
// db.collection('Entries').add({
//  Project: 'Test from code',
//  Description: 'Just testing my db adding info from code',
//  Start_Time: '00:05:22 PM',
//  Tags: ['coding', 'javascript', 'test']
// })
// .then(function (docRef) {
//  console.log('Document written with ID: ', docRef.id)
// })
// .catch(function (error) {
//  console.error('Error adding document: ', error)
// })
