import { Component, OnInit } from "@angular/core";
import { data, competency_level } from "src/assets/models/data";

import { CertificateService } from "../services/certificate.service";
import { AuthenticationService } from "../services/authentication.service";

import moment from "moment";
@Component({
  selector: "app-participant",
  templateUrl: "./participant.component.html",
  styleUrls: ["./participant.component.css"],
})
export class ParticipantComponent implements OnInit {
  value;
  filter_value;
  keyword;
  sort = null;

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
          this.filter_value = result;
        }
      });
  }

  ngOnInit() {}

  getDate(value) {
    return moment(value).format("DD/MM/yyyy");
  }

  onSearching() {
    const value = JSON.parse(JSON.stringify(this.value));

    if (this.keyword && this.keyword.length) {
      this.filter_value = value.filter(
        (item) =>
          item.name_th.toLowerCase().indexOf(this.keyword.toLowerCase()) > -1 ||
          item.name_en.toLowerCase().indexOf(this.keyword.toLowerCase()) > -1
      );
    } else {
      this.filter_value = value;
    }

    this.onSorting();
  }

  onSorting() {
    if (this.sort) {
      this.filter_value.sort((a, b) => {
        if (this.sort == 1) {
          return (
            new Date(b.cert_approved_date).getDate() -
            new Date(a.cert_approved_date).getDate()
          );
        } else if (this.sort == 2) {
          return (
            new Date(a.cert_approved_date).getDate() -
            new Date(b.cert_approved_date).getDate()
          );
        }
      });
    }
  }

  onClearSearching() {
    this.keyword = null;
    this.onSearching();
  }
}
