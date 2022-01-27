import { Component, Inject, OnInit } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: "app-confirm-delete-dialog",
  templateUrl: "./confirm-delete-dialog.component.html",
  styleUrls: ["./confirm-delete-dialog.component.css"],
})
export class ConfirmDeleteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onCloseModal(isModify) {
    this.dialogRef.close(isModify);
  }
}
