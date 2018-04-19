import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { NotifyService } from './notify.service';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ItemService } from './item.service';
import { VimeoService } from './vimeo.service';


@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService, NotifyService, ItemService, VimeoService]
})
export class CoreModule { }
