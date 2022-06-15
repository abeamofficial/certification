import { Component, OnInit } from "@angular/core";
import moment from "moment";

import { MatDialog } from "@angular/material/dialog";
import { SeasonService } from "src/app/services/season.service";
import { SeasonDataDialogComponent } from "../dialog/season-data-dialog/season-data-dialog.component";
import { ConfirmDeleteDialogComponent } from "../dialog/confirm-delete-dialog/confirm-delete-dialog.component";

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

  onOpenDeleteDialog(season) {
    const dialogRef = this.matDialog.open(ConfirmDeleteDialogComponent, {
      data: { text: season.module_name_th + " รุ่นที่ " + season.season },
      height: "30%",
      width: "30%",
      minHeight: "300px",
      minWidth: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onDeleteSeason(season.id);
      }
    });
  }

  async onDeleteSeason(id: string) {
    await this.seasonService.deleteSeasonById(id).then((result) => {
      if (result) {
        this.getSeason().then(() => {
          this.onSearching();
        });
      } else {
      }
    });
  }

  onSearching() {
    if (this.keyword && this.keyword.length) {
      const value = JSON.parse(JSON.stringify(this.value));
      this.filter_value = value.filter(
        (item) =>
          item.m_id.indexOf(this.keyword) > -1 ||
          item.module_name_th
            .toLowerCase()
            .indexOf(this.keyword.toLowerCase()) > -1 ||
          item.module_name_en
            .toLowerCase()
            .indexOf(this.keyword.toLowerCase()) > -1
      );
    } else {
      JSON.parse(JSON.stringify(this.value));
      this.filter_value = JSON.parse(JSON.stringify(this.value));
    }
  }

  onClearSearching() {
    this.keyword = null;
    this.onSearching();
  }
}
