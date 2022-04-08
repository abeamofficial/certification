import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { BadgeDataDialogComponent } from "../dialog/badge-data-dialog/badge-data-dialog.component";

import { BadgeService } from "src/app/services/badge.service";

@Component({
  selector: "app-badge-data",
  templateUrl: "./badge-data.component.html",
  styleUrls: ["./badge-data.component.css"],
})
export class BadgeDataComponent implements OnInit {
  p: number = 1;
  itemsPerPage = 15;
  value = null;
  filter_value;
  keyword;

  constructor(
    public matDialog: MatDialog,
    private badgeService: BadgeService
  ) {}

  ngOnInit() {
    this.getBadgeData();
  }

  absoluteIndex(indexOnPage: number): number {
    return this.itemsPerPage * (this.p - 1) + indexOnPage;
  }

  async getBadgeData() {
    await this.badgeService.getBadge().then((result) => {
      if (result) {
        this.value = result;
        this.filter_value = result;
      }
    });
  }

  onOpenBadgeDialog(isEdit, value) {
    this.matDialog.open(BadgeDataDialogComponent, {
      data: { isEdit: isEdit, ...(value && { value: value }) },
      height: "70%",
      width: "30%",
      minHeight: "400px",
      minWidth: "500px",
    });
  }

  onSearching() {
    const value = JSON.parse(JSON.stringify(this.value));

    if (this.keyword && this.keyword.length) {
      this.filter_value = value.filter(
        (item) =>
          item.course_name_th
            .toLowerCase()
            .indexOf(this.keyword.toLowerCase()) > -1 ||
          item.course_name_en
            .toLowerCase()
            .indexOf(this.keyword.toLowerCase()) > -1
      );
    } else {
      this.filter_value = value;
    }
  }

  onClearSearching() {
    this.keyword = null;
    this.onSearching();
  }
}
