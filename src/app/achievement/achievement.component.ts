import { Component, OnInit } from "@angular/core";
import { data, competency_level } from "src/assets/models/data";
@Component({
  selector: "app-achievement",
  templateUrl: "./achievement.component.html",
  styleUrls: ["./achievement.component.css"],
})
export class AchievementComponent implements OnInit {
  value = data.achievement_certificate;
  constructor() {}

  ngOnInit() {}
}
