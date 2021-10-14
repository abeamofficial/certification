import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { TranscriptDetailComponent } from "./transcript-detail/transcript-detail.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "transcript-detail", component: TranscriptDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
