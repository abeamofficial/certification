import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { data, competency_level } from "src/assets/models/data";
@Component({
  selector: "app-transcript-detail",
  templateUrl: "./transcript-detail.component.html",
  styleUrls: ["./transcript-detail.component.css"],
})
export class TranscriptDetailComponent implements OnInit {
  value;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.value = data.earn_lo.find((item) => item.id == params.id);
      }
    });
  }

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
