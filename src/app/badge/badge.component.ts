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
  filter_value;
  keyword;
  sort = null;

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
          this.filter_value = result;
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

  onSearching() {
    const value = JSON.parse(JSON.stringify(this.value));

    if (this.keyword || this.keyword.length) {
      this.filter_value = value.filter(
        (item) =>
          item.course_name_th
            .toLowerCase()
            .indexOf(this.keyword.toLowerCase()) > -1 ||
          item.course_name_en
            .toLowerCase()
            .indexOf(this.keyword.toLowerCase()) > -1
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
            new Date(b.badge_date).getDate() - new Date(a.badge_date).getDate()
          );
        } else if (this.sort == 2) {
          return (
            new Date(a.badge_date).getDate() - new Date(b.badge_date).getDate()
          );
        } else if (this.sort == 3) {
          return (
            this.calculationService.getSummaryScore([
              b.objective_score,
              b.practice_score,
            ]) -
            this.calculationService.getSummaryScore([
              a.objective_score,
              a.practice_score,
            ])
          );
        } else if (this.sort == 4) {
          return (
            this.calculationService.getSummaryScore([
              a.objective_score,
              a.practice_score,
            ]) -
            this.calculationService.getSummaryScore([
              b.objective_score,
              b.practice_score,
            ])
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
