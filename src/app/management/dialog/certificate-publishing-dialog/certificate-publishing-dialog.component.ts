import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: "app-certificate-publishing-dialog",
  templateUrl: "./certificate-publishing-dialog.component.html",
  styleUrls: ["./certificate-publishing-dialog.component.css"],
})
export class CertificatePublishingDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CertificatePublishingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onCloseModal() {
    this.dialogRef.close();
  }
}
