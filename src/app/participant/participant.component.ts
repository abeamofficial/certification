import { Component, OnInit } from "@angular/core";
import { data, competency_level } from "src/assets/models/data";

import { CertificateService } from "../services/certificate.service";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-participant",
  templateUrl: "./participant.component.html",
  styleUrls: ["./participant.component.css"],
})
export class ParticipantComponent implements OnInit {
  value;

  constructor(
    private certificateService: CertificateService,
    private authenticationService: AuthenticationService
  ) {
    this.certificateService
      .getCertificateOfParticipantByUserId(
        this.authenticationService.currentUserValue.id
      )
      .then((result) => {
        if (result) {
          this.value = result;
        }
      });

    console.log(this.value);
  }

  ngOnInit() {}
}
