import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { data, competency_level } from "src/assets/models/data";

@Component({
  selector: "app-badge-detail",
  templateUrl: "./badge-detail.component.html",
  styleUrls: ["./badge-detail.component.css"],
})
export class BadgeDetailComponent implements OnInit {
  value;
  course_detail;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.value = data.badge.find((item) => item.id == params.id);
        this.course_detail = data.course.find(
          (item) => item.id == this.value.course_id
        );
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

  onNavigate(url) {
    window.location.href = url;
  }
}
