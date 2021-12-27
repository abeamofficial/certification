import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: "app-certificate-data-dialog",
  templateUrl: "./certificate-data-dialog.component.html",
  styleUrls: ["./certificate-data-dialog.component.css"],
})
export class CertificateDataDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CertificateDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onCloseModal() {
    this.dialogRef.close();
  }
}

// export class AddUserDialogComponent implements OnInit {
//   constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>) {}

//   mock_student;
//   ngOnInit() {}

//   upload(file: any) {
//     this.mock_student = "BIA01\nBIA02\nBIA03\nBIA05\nBIA06";

//     // console.log(file);
//   }

//   onCloseModal() {
//     this.dialogRef.close();
//   }
// }
