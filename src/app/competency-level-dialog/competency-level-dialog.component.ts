import { Component, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";

@Component({
  selector: "app-competency-level-dialog",
  templateUrl: "./competency-level-dialog.component.html",
  styleUrls: ["./competency-level-dialog.component.css"],
})
export class CompetencyLevelDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CompetencyLevelDialogComponent>) {}

  ngOnInit() {}

  onCloseModal() {
    this.dialogRef.close();
  }
}
