import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { data, competency_level } from "src/assets/models/data";

@Component({
  selector: "app-participant-cert-detail",
  templateUrl: "./participant-cert-detail.component.html",
  styleUrls: ["./participant-cert-detail.component.css"],
})
export class ParticipantCertDetailComponent implements OnInit {
  data = data;
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
          (item) => item.id == this.value.module_id
        );
      }
    });
  }

  onNavigate(url) {
    window.location.href = url;
  }

  scrollToId($event) {
    const element = document.getElementById(
      $event.index == 0 ? "about" : $event.index == 1 ? "course" : "institution"
    );
    const offset = 100;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    // document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  }
}
