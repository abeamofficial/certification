import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { data, competency_level } from "src/assets/models/data";

@Component({
  selector: "app-participant-cert-detail",
  templateUrl: "./participant-cert-detail.component.html",
  styleUrls: ["./participant-cert-detail.component.css"],
})
export class ParticipantCertDetailComponent implements OnInit {
  value;
  module_detail;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.value = data.participant_certificate.find(
          (item) => item.id == params.id
        );
        this.module_detail = data.module.find(
          (item) => item.id == this.value.course_id
        );
      }
    });
  }
}
