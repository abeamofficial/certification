import { Component, OnInit } from "@angular/core";
import { data, competency_level } from "src/assets/models/data";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  menu = 0;
  value = data;
  constructor() {}

  ngOnInit() {}
  change($event) {
    this.menu = $event.index;
  }
}
