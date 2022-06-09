import { Component, OnInit, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: "app-add-student-data-dialog",
  templateUrl: "./add-student-data-dialog.component.html",
  styleUrls: ["./add-student-data-dialog.component.css"],
})
export class AddStudentDataDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddStudentDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onCloseModal(isModify: boolean) {
    this.dialogRef.close(isModify);
  }
}
