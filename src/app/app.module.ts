import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { CoreModule } from './core/core.module';
import { TopNavComponent } from './ui/top-nav/top-nav.component';
import { NotificationMessageComponent } from './ui/notification-message/notification-message.component';
import { ReadmePageComponent } from './ui/readme-page/readme-page.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { EmbedVideo } from 'ngx-embed-video';
import { HttpModule } from '@angular/http';
import { VideoSuccessComponent } from './ui/video-success/video-success.component';



@NgModule({
  declarations: [
    AppComponent,
    
    UserLoginComponent,
    UserProfileComponent,
    TopNavComponent,
    NotificationMessageComponent,
    ReadmePageComponent,
    DashboardComponent,
    VideoSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpModule,
    EmbedVideo.forRoot(),
    AngularFontAwesomeModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
