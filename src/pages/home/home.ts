import { Component } from "@angular/core";
import firebase from 'firebase';
import 'firebase/firestore';
import { ModalController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { firebaseConfig } from '../../environment';
import { TagsModalPage } from '../tags-modal/tags-modal';
// import {entries} from './entries.ts';

firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true,
});

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  myIcon: string;
  desp;
  showElap;
  card2show = false;
  recordDur;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
  }

  public openModal() {
  const modalPage = this.modalCtrl.create(TagsModalPage); modalPage.present();
  }

  public ionViewDidLoad() {
    console.log('running');

    //  console.log(entries.importTest);
    const that = this;

    // SETTING UP VARIABLES
    const time = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      cseconds: 0,
      running: false,
      start: -1,
    };

    const toggleButton;
    //  var resetButton
    const timeDisplay;
    const counter;

    initTime();
    initDisplay();
    initHandlers();

    // 1
    // SETUP TIME ARRAY
    function initTime() {
      time.hours = 0,
        time.minutes = 0,
        time.seconds = 0,
        time.cseconds = 0,
        time.running = false,
        time.start = -1;
    }

    // 2
    // ATTACH HTML IDs TO VARIABLES
    function initDisplay() {
      timeDisplay = document.querySelector('#elap');
      //  timeDisplay = that.elap;
      toggleButton = document.querySelector('#startBtn');
      //  resetButton = document.querySelector('#reset')
      setToggleButton();
      displayTime();
    }

    // 5
    // ATTACHING TO HTML PIECES
    function initHandlers() {
      toggleButton.addEventListener('click', toggle);
      //  resetButton.addEventListener('click', reset)
    }

    // 3
    function setToggleButton() {
      if (time.running === false) {
        that.myIcon = "play";
      } else {
        that.myIcon = "square";
      }
    }

    // RESET

    // 4
    // SETUP TIME FORMAT
    function displayTime() {
      const timeStr;

      timeStr =
        ('00' + time.hours).slice(-2) + ':' +
        ('00' + time.minutes).slice(-2) + ':' +
        ('00' + time.seconds).slice(-2) + ':' +
        ('00' + time.cseconds).slice(-2);

      // timeDisplay.text = timeStr;
      that.showElap = timeStr;
    }

    // CALCULATE ELAPSED TIME
    function incTime() {
      const timeDiff = Date.now() - time.start;
      const timeElap = Math.abs(timeDiff / 1000);
      time.cseconds = Math.floor((timeDiff / 10) % 100); // math.floor rounds downwards
      time.seconds = Math.floor((timeElap) % 60);
      time.minutes = Math.floor((timeElap / 60) % 60);
      time.hours = Math.floor((timeElap / 60) / 60);
      displayTime();
    }

    // 6
    // TOGGLE BUTTON FUNCTION
    function toggle() {
      function doHomework(subject, callback1) {
        subject();
        callback1();
      }
      time.running = !time.running;
      setToggleButton();
      // CHECK IF NO DESCRIPTION ENTERED
      if (that.desp === undefined) {
        that.desp = "[no description entered]";
      }
      // START BUTTON IS CLICKED
      if (time.running) {
        time.start = Date.now();
        time.start -= (time.cseconds * 10) +
          (time.seconds * 1000) +
          (time.minutes * 1000 * 60);
        counter = setInterval(incTime, 100);
        console.log('clicked Start');
        console.log(that.desp);
        // NEW ENTRY IN DB
        // entries.newEntry();
        db.collection('Entries').add({
          Order: 1,
          Start_Time: firebase.firestore.FieldValue.serverTimestamp(),
          Description: that.desp,
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
                Order: doc.data().Order + 1,
              });
            });
          });

        // STOP BUTTON IS CLICKED
      } else {
        clearInterval(counter);
        console.log('clicked Stop');
        that.recordDur = that.showElap;
        console.log(that.showElap);
        // ADD CARD OF ENTRY
        that.card2show = true;
        // CLOSE DB ENTRY AND RECORD DURATION
        // doHomework(entriesJS.closeEntry(recordDur), reset());
        doHomework(function closeEntry() {
          db.collection('Entries').where('Order', '==', 1)
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                console.log(doc.id);
                db.collection('Entries').doc(doc.id).update({
                  Order: 2,
                  Stop_Time: firebase.firestore.FieldValue.serverTimestamp(),
                  Duration: that.recordDur,
                });
              });
            })
            .catch(function(error) {
              console.log('Error getting documents: ', error);
            });
        }, function reset() {
          if (time.running === true) {
            toggle();
          }
          initTime();
          displayTime();
          setToggleButton();
        });
      }
    }

  }

}
