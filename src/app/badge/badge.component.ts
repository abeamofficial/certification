import { Component, OnInit } from "@angular/core";
import { data, competency_level } from "src/assets/models/data";

@Component({
  selector: "app-badge",
  templateUrl: "./badge.component.html",
  styleUrls: ["./badge.component.css"],
})
export class BadgeComponent implements OnInit {
  value = data.badge;

  constructor() {}

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
}
