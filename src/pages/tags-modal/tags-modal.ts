import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-tags-modal',
  templateUrl: 'tags-modal.html',
})
export class TagsModalPage {
  // load all tags from firebase
  allTags = ["Javascript", "Coding", "Ionic", "Angular", "Kotlin", "Java"];
  receivedTags;
  availTags;
  returnTags;

  helloName: boolean = true;
  card2show: boolean = true;

  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController) {
    this.receivedTags = params.get('data');
    this.returnTags = this.receivedTags.concat();
  }

  // this will calculate the difference btwn the two
  arr_diff(a1, a2) {
    const a = [];
    const diff = [];
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

  public ionViewDidLoad() {
    console.log("tags from receivedTags: ", this.receivedTags);
    function doHomework(subject, callback1) {
      const subject;
      const callback1;
    }

    doHomework(this.availTags = this.arr_diff(this.allTags, this.receivedTags), this.card2show = true);
    console.log("these are the tags available", this.availTags);
    console.log("returnTags=", this.returnTags);
  }

  updateTags(value, status: boolean) {
    if (this.returnTags.indexOf(value) === -1 && status) { // if not found [-1] is returned
      this.returnTags.push(value);
      console.log("pushed to returnTags", this.returnTags);
      console.log("tags from receivedTags: ", this.receivedTags);
    } else {
      console.log("in else");
      for (const i = 0; i < this.returnTags.length; i++) {
        console.log("for loop runs");
        if (this.returnTags[i] === value) {
          this.returnTags.splice(i, 1);
          console.log("removed item from returnTags ", this.returnTags);
        }
      }
    }
  }

  dismissModal() {
    this.viewCtrl.dismiss(this.returnTags);
  }

}
