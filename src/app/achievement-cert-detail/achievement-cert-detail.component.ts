import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { data, competency_level } from "src/assets/models/data";
@Component({
  selector: "app-achievement-cert-detail",
  templateUrl: "./achievement-cert-detail.component.html",
  styleUrls: ["./achievement-cert-detail.component.css"],
})
export class AchievementCertDetailComponent implements OnInit {
  value;
  module_detail;
  badge_detail;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.value = data.achievement_certificate.find(
          (item) => item.id == params.id
        );
        this.module_detail = data.module.find(
          (item) => item.id == this.value.module
        );
        this.badge_detail = data.badge.filter((item) =>
          this.value.badge.includes(item.id)
        );
      }
    });
  }
}
