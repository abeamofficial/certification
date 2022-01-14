import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { SignerService } from "src/app/services/signer.service";
@Component({
  selector: "app-certificate-publishing-dialog",
  templateUrl: "./certificate-publishing-dialog.component.html",
  styleUrls: ["./certificate-publishing-dialog.component.css"],
})
export class CertificatePublishingDialogComponent implements OnInit {
  signer;

  constructor(
    public dialogRef: MatDialogRef<CertificatePublishingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private signerService: SignerService
  ) {
    this.getSigner();
  }

  ngOnInit() {}

  async getSigner() {
    await this.signerService.getSigner().then((result) => {
      if (result) {
        this.signer = result;
      }
    });
  }

  onCloseModal() {
    this.dialogRef.close();
  }
}
