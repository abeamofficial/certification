import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { TranscriptComponent } from "./transcript/transcript.component";
import { TranscriptDetailComponent } from "./transcript-detail/transcript-detail.component";
import { AchievementCertDetailComponent } from "./achievement-cert-detail/achievement-cert-detail.component";
import { BadgeDetailComponent } from "./badge-detail/badge-detail.component";
import { ParticipantCertDetailComponent } from "./participant-cert-detail/participant-cert-detail.component";
import { CourseDetailComponent } from "./course-detail/course-detail.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "transcript-detail",
    // component: TranscriptDetailComponent
    children: [
      { path: "", component: TranscriptComponent },
      { path: ":id", component: TranscriptDetailComponent },
    ],
  },
  {
    path: "achievement-cert-detail",
    component: AchievementCertDetailComponent,
  },
  {
    path: "badge-detail",
    component: BadgeDetailComponent,
  },
  {
    path: "participant-cert-detail",
    component: ParticipantCertDetailComponent,
  },
  {
    path: "course-detail",
    component: CourseDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
