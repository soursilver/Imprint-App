import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the TagsModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tags-modal',
  templateUrl: 'tags-modal.html',
})
export class TagsModalPage {

  card2show: boolean;

  // result from firebase query (all that that exist)
  fbArr = ["Javascript", "Coding", "Ionic", "Angular", "Kotlin", "Java"];
  // result from DocID tags field
  docArr = ["Javascript", "Coding"];

  helloName: boolean = this.docArr.includes("Coding");

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  arr_diff(a1, a2) {

    const a = []; diff = [];
    for (const i = 0; i < a1.length; i++) {
      a[a1[i]] = true;
    }
    for (const i = 0; i < a2.length; i++) {
      if (a[a2[i]]) {
        delete a[a2[i]];
      } else {
        a[a2[i]] = true;
      }
    }
    for (const k in a) {
      diff.push(k);
    }
    return diff;
  }

  doHomework(subject, callback1) {
    subject();
    callback1();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TagsModalPage');
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

}
