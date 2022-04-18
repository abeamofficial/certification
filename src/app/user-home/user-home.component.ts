import { Component, OnInit } from "@angular/core";
import { data, competency_level } from "src/assets/models/data";
import { Router } from "@angular/router";

import { AuthenticationService } from "../services/authentication.service";
import { AttendanceService } from "../services/attendance.service";

@Component({
  selector: "app-user-home",
  templateUrl: "./user-home.component.html",
  styleUrls: ["./user-home.component.css"],
})
export class UserHomeComponent implements OnInit {
  menu = 0;
  credit = 0;
  user;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private attendanceService: AttendanceService
  ) {
    if (!this.isLogOn()) {
      this.router.navigate(["/login"]);
    }

    this.authenticationService.currentUser.subscribe(
      (item) => (this.user = item)
    );
  }

  ngOnInit() {
    if (this.user) {
      this.attendanceService.getCreditByUserId(this.user.id).then((result) => {
        this.credit = result;
      });
    }
  }

  ngAfterViewInit(): void {
    document
      .getElementsByClassName("mat-tab-header-pagination-before")[0]
      .remove();
    document
      .getElementsByClassName("mat-tab-header-pagination-after")[0]
      .remove();
  }

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
