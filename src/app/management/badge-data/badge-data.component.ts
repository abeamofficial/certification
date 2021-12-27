import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { BadgeDataDialogComponent } from "../dialog/badge-data-dialog/badge-data-dialog.component";

@Component({
  selector: "app-badge-data",
  templateUrl: "./badge-data.component.html",
  styleUrls: ["./badge-data.component.css"],
})
export class BadgeDataComponent implements OnInit {
  p: number = 1;
  itemsPerPage = 15;

  constructor(public matDialog: MatDialog) {}

  ngOnInit() {}

  absoluteIndex(indexOnPage: number): number {
    return this.itemsPerPage * (this.p - 1) + indexOnPage;
  }

  async getBadgeData() {
    // await this.certificateDataService.getCertificate().then((result) => {
    //   if (result) {
    //     this.certificate_list = result;
    //   }
    // });
  }

  onOpenBadgeDialog() {
    this.matDialog.open(BadgeDataDialogComponent, {
      data: { isEdit: false },
      height: "60%",
      width: "40%",
      minHeight: "500px",
      minWidth: "500px",
    });
  }
}
