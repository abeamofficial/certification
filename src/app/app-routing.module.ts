import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { TranscriptComponent } from "./transcript/transcript.component";
import { TranscriptDetailComponent } from "./transcript-detail/transcript-detail.component";
import { AchievementCertDetailComponent } from "./achievement-cert-detail/achievement-cert-detail.component";
import { BadgeDetailComponent } from "./badge-detail/badge-detail.component";
import { ParticipantCertDetailComponent } from "./participant-cert-detail/participant-cert-detail.component";
import { CourseDetailComponent } from "./course-detail/course-detail.component";
import { ModuleDetailComponent } from "./module-detail/module-detail.component";
import { LoginComponent } from "./login/login.component";
import { CertificateDataComponent } from "./management/certificate-data/certificate-data.component";
import { CertificateDataDialogComponent } from "./management/dialog/certificate-data-dialog/certificate-data-dialog.component";
import { BadgeDataComponent } from "./management/badge-data/badge-data.component";
import { BadgeDataDialogComponent } from "./management/dialog/badge-data-dialog/badge-data-dialog.component";
import { SignerDataComponent } from "./management/signer-data/signer-data.component";
import { SignerDataDialogComponent } from "./management/dialog/signer-data-dialog/signer-data-dialog.component";
import { CertificateSummaryComponent } from "./management/certificate-summary/certificate-summary.component";
import { CertificatePublishingComponent } from "./management/certificate-publishing/certificate-publishing.component";
import { CertificatePublishingDialogComponent } from "./management/dialog/certificate-publishing-dialog/certificate-publishing-dialog.component";

import { ConfirmDeleteDialogComponent } from "./management/dialog/confirm-delete-dialog/confirm-delete-dialog.component";
import { PloProgressComponent } from "./plo-progress/plo-progress.component";
import { CompetencyLevelDialogComponent } from "./competency-level-dialog/competency-level-dialog.component";

import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  { path: "login", component: LoginComponent },
  {
    path: "transcript-detail",
    // component: TranscriptDetailComponent
    children: [
      { path: "", component: HomeComponent },
      { path: ":id", component: TranscriptDetailComponent },
    ],
  },
  {
    path: "achievement-cert-detail",
    // component: AchievementCertDetailComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: ":id", component: AchievementCertDetailComponent },
    ],
  },
  {
    path: "badge-detail",
    // component: BadgeDetailComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: ":id", component: BadgeDetailComponent },
    ],
  },
  {
    path: "participant-cert-detail",
    // component: ParticipantCertDetailComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: ":id", component: ParticipantCertDetailComponent },
    ],
  },
  {
    path: "course-detail",
    // component: CourseDetailComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: ":id", component: CourseDetailComponent },
    ],
  },
  {
    path: "module-detail",
    // component: CourseDetailComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: ":id", component: ModuleDetailComponent },
    ],
  },
  { path: "certficate-data-management", component: CertificateDataComponent },
  { path: "badge-data-management", component: BadgeDataComponent },
  { path: "signer-data-management", component: SignerDataComponent },
  {
    path: "certificate-summary-management",
    component: CertificateSummaryComponent,
  },
  { path: "certificate-publishing", component: CertificatePublishingComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "top",
    }),
  ],
  exports: [RouterModule],
  entryComponents: [
    CertificateDataDialogComponent,
    BadgeDataDialogComponent,
    SignerDataDialogComponent,
    CertificatePublishingDialogComponent,
    ConfirmDeleteDialogComponent,
    CompetencyLevelDialogComponent,
  ],
})
export class AppRoutingModule {}
