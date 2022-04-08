import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { SignerService } from "src/app/services/signer.service";
import { SignerDataDialogComponent } from "../dialog/signer-data-dialog/signer-data-dialog.component";
@Component({
  selector: "app-signer-data",
  templateUrl: "./signer-data.component.html",
  styleUrls: ["./signer-data.component.css"],
})
export class SignerDataComponent implements OnInit {
  p: number = 1;
  itemsPerPage = 15;
  value = null;
  filter_value;
  keyword;

  constructor(
    public matDialog: MatDialog,
    private signerService: SignerService
  ) {}

  ngOnInit() {
    this.getSignerData();
  }

  absoluteIndex(indexOnPage: number): number {
    return this.itemsPerPage * (this.p - 1) + indexOnPage;
  }

  async getSignerData() {
    await this.signerService.getSigner().then((result) => {
      if (result) {
        this.value = result;
        this.filter_value = result;
      }
    });
  }

  onOpenSignerDialog(isEdit, value) {
    const dialogRef = this.matDialog.open(SignerDataDialogComponent, {
      data: { isEdit: isEdit, ...(value && { value: value }) },
      height: "60%",
      width: "30%",
      minHeight: "500px",
      minWidth: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getSignerData();
      }
    });
  }

  onSearching() {
    const value = JSON.parse(JSON.stringify(this.value));

    if (this.keyword && this.keyword.length) {
      this.filter_value = value.filter(
        (item) =>
          item.first_name.toLowerCase().indexOf(this.keyword.toLowerCase()) >
            -1 ||
          item.last_name.toLowerCase().indexOf(this.keyword.toLowerCase()) >
            -1 ||
          item.prefix_name.toLowerCase().indexOf(this.keyword.toLowerCase()) >
            -1
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
