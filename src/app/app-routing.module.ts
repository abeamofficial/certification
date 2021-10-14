import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { TranscriptDetailComponent } from "./transcript-detail/transcript-detail.component";
import { AchievementCertDetailComponent } from "./achievement-cert-detail/achievement-cert-detail.component";
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "transcript-detail", component: TranscriptDetailComponent },
  {
    path: "achievement-cert-detail",
    component: AchievementCertDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
