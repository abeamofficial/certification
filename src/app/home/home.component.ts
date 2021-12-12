import { Component, OnInit } from "@angular/core";
import { data, competency_level } from "src/assets/models/data";
import { Router } from "@angular/router";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  menu = 0;
  value = data;
  constructor(private router: Router) {
    if (!this.isLogOn()) {
      router.navigate(["/login"]);
    }
  }

  ngOnInit() {}
  change($event) {
    this.menu = $event.index;
  }

  isLogOn() {
    return (
      localStorage.getItem("c_login") &&
      localStorage.getItem("c_login") == "true"
    );
  }
}
