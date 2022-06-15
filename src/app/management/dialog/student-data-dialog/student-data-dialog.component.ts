import { Component, OnInit, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

import { StudentService } from "src/app/services/student.service";

@Component({
  selector: "app-student-data-dialog",
  templateUrl: "./student-data-dialog.component.html",
  styleUrls: ["./student-data-dialog.component.css"],
})
export class StudentDataDialogComponent implements OnInit {
  studentForm = this.fb.group({
    id: null, // record id
    nametitle: null,
    firstname: null,
    lastname: null,
  });

  updateData = false;

  constructor(
    public dialogRef: MatDialogRef<StudentDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    if (this.data.value) {
      this.studentForm.patchValue(this.data.value);
    }
  }

  onSave() {
    this.studentService
      .updateStudentById(this.studentForm.value)
      .then((result) => {
        if (result) {
          this.onCloseModal(true);
        } else {
          //
        }
      });
  }

  // getStudentById() {
  //   this.studentService
  //     .getStudentById(this.studentForm.value.id)
  //     .then((result) => {
  //       if (result) {
  //         this.data.value = { ...this.data.value, ...result };
  //         this.data.isEdit = false;
  //         this.studentForm.patchValue(result);
  //         this.updateData = true;
  //       } else {
  //         //
  //       }
  //     });
  // }

  onCloseModal(isModify) {
    this.dialogRef.close(isModify);
  }
}
