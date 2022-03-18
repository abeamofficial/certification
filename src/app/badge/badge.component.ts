import { Component, OnInit } from "@angular/core";
import { data, competency_level } from "src/assets/models/data";
import { AuthenticationService } from "../services/authentication.service";

import { BadgeService } from "../services/badge.service";
import { CalculationService } from "../services/calculation.service";

@Component({
  selector: "app-badge",
  templateUrl: "./badge.component.html",
  styleUrls: ["./badge.component.css"],
})
export class BadgeComponent implements OnInit {
  value;

  constructor(
    private badgeService: BadgeService,
    private authenticationService: AuthenticationService,
    private calculationService: CalculationService
  ) {
    this.badgeService
      .getBadgeByUserId(this.authenticationService.currentUserValue.id)
      .then((result) => {
        if (result) {
          this.value = result;
        }
      });
  }

  ngOnInit() {}

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
}
