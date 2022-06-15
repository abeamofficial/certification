import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { CertificateService } from "src/app/services/certificate.service";
import { CertificateDataDialogComponent } from "../dialog/certificate-data-dialog/certificate-data-dialog.component";
import { ConfirmDeleteDialogComponent } from "../dialog/confirm-delete-dialog/confirm-delete-dialog.component";

@Component({
  selector: "app-certificate-data",
  templateUrl: "./certificate-data.component.html",
  styleUrls: ["./certificate-data.component.css"],
})
export class CertificateDataComponent implements OnInit {
  p: number = 1;
  itemsPerPage = 25;
  value = null;
  filter_value;
  keyword;
  constructor(
    private certificateDataService: CertificateService,
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
        this.value = result;
        this.filter_value = result;
      }
    });
  }

  onOpenCertificateDialog(isEdit, value) {
    const dialogRef = this.matDialog.open(CertificateDataDialogComponent, {
      data: { isEdit: isEdit, ...(value && { value: value }) },
      height: "60%",
      width: "30%",
      minHeight: "500px",
      minWidth: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCertificateData().then(() => {
          this.onSearching();
        });
      }
    });
  }

  onOpenDeleteDialog(certificate) {
    const dialogRef = this.matDialog.open(ConfirmDeleteDialogComponent, {
      data: { text: certificate.cert_name_th },
      height: "30%",
      width: "30%",
      minHeight: "300px",
      minWidth: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onDeleteCertificate(certificate.id);
      }
    });
  }

  async onDeleteCertificate(id: string) {
    await this.certificateDataService
      .deleteCertificateById(id)
      .then((result) => {
        if (result) {
          this.getCertificateData().then(() => {
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
          item.name_th.toLowerCase().indexOf(this.keyword.toLowerCase()) > -1 ||
          item.name_en.toLowerCase().indexOf(this.keyword.toLowerCase()) > -1
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
