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
  signer_list = null;
  p: number = 1;
  itemsPerPage = 15;

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
        this.signer_list = result;
      }
    });
  }

  onOpenCreateSignerDialog() {
    this.matDialog.open(SignerDataDialogComponent, {
      data: { isEdit: false },
      height: "60%",
      width: "30%",
      minHeight: "500px",
      minWidth: "500px",
    });
  }

  onOpenSignerDialog(isEdit, value) {
    this.matDialog.open(SignerDataDialogComponent, {
      data: { isEdit: isEdit, value: value },
      height: "60%",
      width: "30%",
      minHeight: "500px",
      minWidth: "500px",
    });
  }
}
