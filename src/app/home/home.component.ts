import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  menu = 2;
  constructor() {}

  ngOnInit() {}
  change($event) {
    this.menu = $event.index;
  }
}
