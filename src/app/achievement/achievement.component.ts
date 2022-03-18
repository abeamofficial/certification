import { Component, OnInit } from "@angular/core";
import { data, competency_level } from "src/assets/models/data";

import { CertificateService } from "../services/certificate.service";
import { AuthenticationService } from "../services/authentication.service";
@Component({
  selector: "app-achievement",
  templateUrl: "./achievement.component.html",
  styleUrls: ["./achievement.component.css"],
})
export class AchievementComponent implements OnInit {
  //   ./../../certification-img/

  value;
  constructor(
    private certificateDataService: CertificateService,
    private authenticationService: AuthenticationService
  ) {
    this.certificateDataService
      .getCertificateOfAchievementByUserId(
        this.authenticationService.currentUserValue.id
      )
      .then((result) => {
        if (result) {
          this.value = result;
        }
      });
  }

  ngOnInit() {}
}
