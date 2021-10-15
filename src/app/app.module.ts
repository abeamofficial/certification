import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { EllipsisModule } from "ngx-ellipsis";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./component/navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { TranscriptComponent } from "./transcript/transcript.component";
import { AchievementComponent } from "./achievement/achievement.component";
import { BadgeComponent } from "./badge/badge.component";
import { ParticipantComponent } from './participant/participant.component';
import { MyCourseComponent } from './my-course/my-course.component';
import { TranscriptDetailComponent } from './transcript-detail/transcript-detail.component';
import { AchievementCertDetailComponent } from './achievement-cert-detail/achievement-cert-detail.component';
import { BadgeDetailComponent } from './badge-detail/badge-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TranscriptComponent,
    AchievementComponent,
    BadgeComponent,
    ParticipantComponent,
    MyCourseComponent,
    TranscriptDetailComponent,
    AchievementCertDetailComponent,
    BadgeDetailComponent,
  ],
  imports: [
    EllipsisModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
