import { Component, OnInit, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: "app-add-enroll-data-dialog",
  templateUrl: "./add-enroll-data-dialog.component.html",
  styleUrls: ["./add-enroll-data-dialog.component.css"],
})
export class AddEnrollDataDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddEnrollDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onCloseModal(isModify: boolean) {
    this.dialogRef.close(isModify);
  }
}
