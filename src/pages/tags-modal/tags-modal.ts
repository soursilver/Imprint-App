import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-tags-modal',
  templateUrl: 'tags-modal.html',
})
export class TagsModalPage {

  projectTags;
  myParam2;

  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController) {
    // this.projectTags = params.get('myParam');
    this.projectTags = params.get('data');
    // console.log("projectTags",this.projectTags)
  }

  helloName: boolean = true;
  card2show: boolean = true;

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

  openTags = [];
  newTags = [];

  public ionViewDidLoad() {
    // result from firebase query (all tags that that exist)
    const fbArr = ["Javascript", "Coding", "Ionic", "Angular", "Kotlin", "Java"];
    // result from DocID tags field
    const docArr = this.projectTags; //["Javascript","Coding","Ionic"];
    console.log(this.projectTags)
    function doHomework(subject, callback1) {
      subject;
      callback1;
    }

    doHomework(this.openTags = this.arr_diff(fbArr, docArr), this.card2show = true);
    console.log(this.openTags);
  }

  updateTags(value, status: boolean) {
    if (this.newTags.indexOf(value) === -1 && status) {
      this.newTags.push(value);
      console.log("pushed to array", this.newTags)
    } else {
      console.log("in else");
      for (var i = 0; i < this.newTags.length; i++) {
        console.log("for loop runs")
        if (this.newTags[i] === value) {
          this.newTags.splice(i, 1);
          console.log("removed item")
          console.log(this.newTags)
        }
      }
    }
  }

  dismissModal() {
    this.myParam2 = this.newTags;
    this.navCtrl.push(HomePage, { 'sendToHome': this.myParam2 });
    this.viewCtrl.dismiss();
  }

}
