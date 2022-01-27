import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { EllipsisModule } from "ngx-ellipsis";
import { NgxPaginationModule } from "ngx-pagination";
import { HttpClientModule, HttpClient } from "@angular/common/http";
// import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { NgxFileDropModule } from "ngx-file-drop";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatFormFieldModule, MatSelectModule } from "@angular/material";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./component/navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { TranscriptComponent } from "./transcript/transcript.component";
import { AchievementComponent } from "./achievement/achievement.component";
import { BadgeComponent } from "./badge/badge.component";
import { ParticipantComponent } from "./participant/participant.component";
import { MyCourseComponent } from "./my-course/my-course.component";
import { TranscriptDetailComponent } from "./transcript-detail/transcript-detail.component";
import { AchievementCertDetailComponent } from "./achievement-cert-detail/achievement-cert-detail.component";
import { BadgeDetailComponent } from "./badge-detail/badge-detail.component";
import { FooterComponent } from "./component/footer/footer.component";
import { ParticipantCertDetailComponent } from "./participant-cert-detail/participant-cert-detail.component";
import { CourseDetailComponent } from "./course-detail/course-detail.component";
import { ModuleDetailComponent } from "./module-detail/module-detail.component";
import { LoginComponent } from "./login/login.component";
import { SidebarComponent } from "./component/sidebar/sidebar.component";
import { UserHomeComponent } from "./user-home/user-home.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { CertificateDataComponent } from "./management/certificate-data/certificate-data.component";

import { CertificateDataDialogComponent } from "./management/dialog/certificate-data-dialog/certificate-data-dialog.component";
import { BadgeDataComponent } from "./management/badge-data/badge-data.component";
import { BadgeDataDialogComponent } from "./management/dialog/badge-data-dialog/badge-data-dialog.component";
import { SignerDataComponent } from "./management/signer-data/signer-data.component";
import { SignerDataDialogComponent } from "./management/dialog/signer-data-dialog/signer-data-dialog.component";
import { CertificateSummaryComponent } from "./management/certificate-summary/certificate-summary.component";
import { CertificatePublishingComponent } from "./management/certificate-publishing/certificate-publishing.component";
import { CertificatePublishingDialogComponent } from "./management/dialog/certificate-publishing-dialog/certificate-publishing-dialog.component";
import { ConfirmDeleteDialogComponent } from './management/dialog/confirm-delete-dialog/confirm-delete-dialog.component';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
// }
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
    FooterComponent,
    ParticipantCertDetailComponent,
    CourseDetailComponent,
    ModuleDetailComponent,
    LoginComponent,
    SidebarComponent,
    UserHomeComponent,
    AdminDashboardComponent,
    CertificateDataComponent,
    CertificateDataDialogComponent,
    BadgeDataComponent,
    BadgeDataDialogComponent,
    SignerDataComponent,
    SignerDataDialogComponent,
    CertificateSummaryComponent,
    CertificatePublishingComponent,
    CertificatePublishingDialogComponent,
    ConfirmDeleteDialogComponent,
  ],
  imports: [
    EllipsisModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTabsModule,
    NgxPaginationModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    NgxFileDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
