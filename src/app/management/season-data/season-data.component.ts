import { Component, OnInit } from "@angular/core";
import moment from "moment";

import { MatDialog } from "@angular/material/dialog";
import { SeasonService } from "src/app/services/season.service";
import { SeasonDataDialogComponent } from "../dialog/season-data-dialog/season-data-dialog.component";

@Component({
  selector: "app-season-data",
  templateUrl: "./season-data.component.html",
  styleUrls: ["./season-data.component.css"],
})
export class SeasonDataComponent implements OnInit {
  p: number = 1;
  itemsPerPage = 25;
  value = null;
  filter_value;
  keyword;

  constructor(
    private seasonService: SeasonService,
    public matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.getSeason();
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

  async getSeason() {
    await this.seasonService.getSeason().then((result) => {
      if (result) {
        this.value = result;
        this.filter_value = result;
      }
    });
  }

  onOpenSeasonDialog(isEdit, value) {
    const dialogRef = this.matDialog.open(SeasonDataDialogComponent, {
      data: { isEdit: isEdit, ...(value && { value: value }) },
      height: "50%",
      width: "30%",
      minHeight: "500px",
      minWidth: "500px",
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {

    //   }
    // });
  }
}
