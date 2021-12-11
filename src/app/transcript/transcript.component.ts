import { Component, OnInit } from "@angular/core";
import { data, competency_level } from "src/assets/models/data";

@Component({
  selector: "app-transcript",
  templateUrl: "./transcript.component.html",
  styleUrls: ["./transcript.component.css"],
})
export class TranscriptComponent implements OnInit {
  value = data;

  constructor() {}

  ngOnInit() {}

  getAverage(ary) {
    let total = 0;
    for (var i = 0; i < ary.length; i++) {
      total += ary[i].score;
    }
    return Number((total / ary.length).toFixed(0));
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
}
