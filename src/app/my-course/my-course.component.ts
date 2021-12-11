import { Component, OnInit } from "@angular/core";
import { data, competency_level } from "src/assets/models/data";

@Component({
  selector: "app-my-course",
  templateUrl: "./my-course.component.html",
  styleUrls: ["./my-course.component.css"],
})
export class MyCourseComponent implements OnInit {
  value = data.module;

  constructor() {}

  ngOnInit() {}
}
