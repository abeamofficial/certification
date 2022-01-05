import { Component, OnInit } from "@angular/core";
import { data, competency_level } from "src/assets/models/data";
import { Router } from "@angular/router";

import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-user-home",
  templateUrl: "./user-home.component.html",
  styleUrls: ["./user-home.component.css"],
})
export class UserHomeComponent implements OnInit {
  menu = 0;
  value = data;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (!this.isLogOn()) {
      this.router.navigate(["/login"]);
    }
  }

  ngOnInit() {}
  change($event) {
    this.menu = $event.index;
  }

  isLogOn() {
    return this.authenticationService.currentUserValue;
    // return (
    //   localStorage.getItem("c_login") &&
    //   localStorage.getItem("c_login") == "true"
    // );
  }
}
