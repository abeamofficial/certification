import { Component, OnInit } from "@angular/core";
import { data, competency_level } from "src/assets/models/data";

import { AttendanceService } from "../services/attendance.service";
import { AuthenticationService } from "../services/authentication.service";

import moment from "moment";

@Component({
  selector: "app-my-course",
  templateUrl: "./my-course.component.html",
  styleUrls: ["./my-course.component.css"],
})
export class MyCourseComponent implements OnInit {
  value;
  filter_value;
  keyword;
  sort = null;

  constructor(
    private attendanceService: AttendanceService,
    private authenticationService: AuthenticationService
  ) {
    this.attendanceService
      .getAttendanceByUserId(this.authenticationService.currentUserValue.id)
      .then((result) => {
        if (result) {
          this.value = result;
          this.filter_value = result;
        }
      });
  }

  ngOnInit() {}

  getDate(value) {
    return moment(value).format("DD/MM/yyyy");
  }

  onSearching() {
    const value = JSON.parse(JSON.stringify(this.value));

    if (this.keyword && this.keyword.length) {
      this.filter_value = value.filter(
        (item) =>
          item.module_name_th
            .toLowerCase()
            .indexOf(this.keyword.toLowerCase()) > -1 ||
          item.module_name_en
            .toLowerCase()
            .indexOf(this.keyword.toLowerCase()) > -1
      );
    } else {
      this.filter_value = value;
    }

    this.onSorting();
  }

  onSorting() {
    if (this.sort) {
      this.filter_value.sort((a, b) => {
        if (this.sort == 1) {
          return (
            new Date(b.create_date).getDate() -
            new Date(a.create_date).getDate()
          );
        } else if (this.sort == 2) {
          return (
            new Date(a.create_date).getDate() -
            new Date(b.create_date).getDate()
          );
        } else if (this.sort == 3) {
          return Number(b.module_credit) - Number(a.module_credit);
        } else if (this.sort == 4) {
          return Number(a.module_credit) - Number(b.module_credit);
        }
      });
    }
  }

  onClearSearching() {
    this.keyword = null;
    this.onSearching();
  }
}
