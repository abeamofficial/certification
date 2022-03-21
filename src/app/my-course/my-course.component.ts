import { Component, OnInit } from "@angular/core";
import { data, competency_level } from "src/assets/models/data";

import { AttendanceService } from "../services/attendance.service";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-my-course",
  templateUrl: "./my-course.component.html",
  styleUrls: ["./my-course.component.css"],
})
export class MyCourseComponent implements OnInit {
  value;

  constructor(
    private attendanceService: AttendanceService,
    private authenticationService: AuthenticationService
  ) {
    this.attendanceService
      .getAttendanceByUserId(this.authenticationService.currentUserValue.id)
      .then((result) => {
        if (result) {
          this.value = result;
        }
      });
  }

  ngOnInit() {}
}
