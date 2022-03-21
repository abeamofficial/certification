import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { data, competency_level } from "src/assets/models/data";

import { CourseService } from "../services/course.service";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-detail.component.html",
  styleUrls: ["./course-detail.component.css"],
})
export class CourseDetailComponent implements OnInit {
  value;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.courseService.getCourseById(params.id).then((result) => {
          if (result) {
            this.value = result;
          }
        });
      }
    });
  }

  getPlo(id) {
    return data.earn_lo.find((item) => item.id === id);
  }

  onNavigate(url) {
    window.location.href = url;
  }

  scrollToId($event) {
    const element = document.getElementById(
      $event.index == 0 ? "about" : "institution"
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
