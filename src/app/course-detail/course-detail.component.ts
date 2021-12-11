import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { data, competency_level } from "src/assets/models/data";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-detail.component.html",
  styleUrls: ["./course-detail.component.css"],
})
export class CourseDetailComponent implements OnInit {
  value;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.value = data.module.find((item) => item.id == params.id);
      }
    });
  }
}
