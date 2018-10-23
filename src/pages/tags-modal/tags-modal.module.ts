import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TagsModalPage } from './tags-modal';

@NgModule({
  declarations: [
    TagsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TagsModalPage),
  ],
})
export class TagsModalPageModule {}
