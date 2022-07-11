import { Component, OnInit } from "@angular/core";
import moment from "moment";

import { MatDialog } from "@angular/material/dialog";
import { EnrollService } from "src/app/services/enroll.service";
import { AddEnrollDataDialogComponent } from "../dialog/add-enroll-data-dialog/add-enroll-data-dialog.component";

@Component({
  selector: "app-enroll-data",
  templateUrl: "./enroll-data.component.html",
  styleUrls: ["./enroll-data.component.css"],
})
export class EnrollDataComponent implements OnInit {
  p: number = 1;
  itemsPerPage = 25;
  value = null;
  filter_value;
  keyword;

  constructor(
    private enrollService: EnrollService,
    public matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.getEnrollData();
  }

  absoluteIndex(indexOnPage: number): number {
    return this.itemsPerPage * (this.p - 1) + indexOnPage;
  }

  getDate(value) {
    if (!value) {
      return "-";
    }
    return moment(value).format("DD/MM/yyyy");
  }

  async getEnrollData() {
    await this.enrollService.getEnrollData().then((result) => {
      if (result) {
        this.value = result;
        this.filter_value = result;
      }
    });
  }

  onOpenCreateSeasonDialog() {
    const dialogRef = this.matDialog.open(AddEnrollDataDialogComponent, {
      // data: { isEdit: isEdit, ...(value && { value: value }) },
      height: "70%",
      width: "40%",
      minHeight: "500px",
      minWidth: "600px",
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {

    //   }
    // });
  }

  onSearching() {}
}
