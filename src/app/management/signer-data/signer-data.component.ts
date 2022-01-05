import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { SignerDataDialogComponent } from "../dialog/signer-data-dialog/signer-data-dialog.component";
@Component({
  selector: "app-signer-data",
  templateUrl: "./signer-data.component.html",
  styleUrls: ["./signer-data.component.css"],
})
export class SignerDataComponent implements OnInit {
  p: number = 1;
  itemsPerPage = 15;

  constructor(public matDialog: MatDialog) {}

  ngOnInit() {}

  absoluteIndex(indexOnPage: number): number {
    return this.itemsPerPage * (this.p - 1) + indexOnPage;
  }

  async getSignerData() {
    // await this.certificateDataService.getCertificate().then((result) => {
    //   if (result) {
    //     this.certificate_list = result;
    //   }
    // });
  }

  onOpenSignerDialog() {
    this.matDialog.open(SignerDataDialogComponent, {
      data: { isEdit: false },
      height: "60%",
      width: "30%",
      minHeight: "500px",
      minWidth: "500px",
    });
  }
}
