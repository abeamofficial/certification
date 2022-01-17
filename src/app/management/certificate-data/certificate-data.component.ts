import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { CertificateDataService } from "src/app/services/certificate-data.service";
import { CertificateDataDialogComponent } from "../dialog/certificate-data-dialog/certificate-data-dialog.component";

@Component({
  selector: "app-certificate-data",
  templateUrl: "./certificate-data.component.html",
  styleUrls: ["./certificate-data.component.css"],
})
export class CertificateDataComponent implements OnInit {
  p: number = 1;
  itemsPerPage = 15;
  certificate_list = null;
  constructor(
    private certificateDataService: CertificateDataService,
    public matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCertificateData();
  }

  absoluteIndex(indexOnPage: number): number {
    return this.itemsPerPage * (this.p - 1) + indexOnPage;
  }

  async getCertificateData() {
    await this.certificateDataService.getCertificate().then((result) => {
      if (result) {
        this.certificate_list = result;
      }
    });
  }

  onOpenCertificateDialog(isEdit, value) {
    this.matDialog.open(CertificateDataDialogComponent, {
      data: { isEdit: isEdit, ...(value && { value: value }) },
      height: "60%",
      width: "30%",
      minHeight: "500px",
      minWidth: "500px",
    });
  }
}
