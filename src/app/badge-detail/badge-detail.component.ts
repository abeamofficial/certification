import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { data, competency_level } from "src/assets/models/data";

import { BadgeService } from "../services/badge.service";
import { AuthenticationService } from "../services/authentication.service";
import { CalculationService } from "../services/calculation.service";

@Component({
  selector: "app-badge-detail",
  templateUrl: "./badge-detail.component.html",
  styleUrls: ["./badge-detail.component.css"],
})
export class BadgeDetailComponent implements OnInit {
  value;
  course_detail;

  constructor(
    private route: ActivatedRoute,
    private badgeService: BadgeService,
    private authenticationService: AuthenticationService,
    private calculationService: CalculationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.badgeService
          .getBadgeById(
            params.id,
            this.authenticationService.currentUserValue.id
          )
          .then((result) => {
            this.value = result;
          });
        // this.value = data.badge.find((item) => item.id == params.id);
        // this.course_detail = data.course.find(
        //   (item) => item.id == this.value.course_id
        // );
      }
    });
  }

  getCompetencyLevel(score) {
    let competency_name;
    Object.entries(competency_level).forEach(([key, item]) => {
      if (score >= item.score_min && score <= item.score_max) {
        competency_name = key;
      }
    });
    return competency_name;
  }

  getSummaryScore(value) {
    return this.calculationService.getSummaryScore(value);
  }

  getScoreLevel(value) {
    return this.calculationService.getScoreLevel(value);
  }

  onNavigate(url) {
    window.location.href = url;
  }
}
