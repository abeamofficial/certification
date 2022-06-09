import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { StudentService } from "src/app/services/student.service";
import { StudentDataDialogComponent } from "../dialog/student-data-dialog/student-data-dialog.component";
import { AddStudentDataDialogComponent } from "../dialog/add-student-data-dialog/add-student-data-dialog.component";

@Component({
  selector: "app-student-data",
  templateUrl: "./student-data.component.html",
  styleUrls: ["./student-data.component.css"],
})
export class StudentDataComponent implements OnInit {
  p: number = 1;
  itemsPerPage = 25;
  value = null;
  filter_value;
  keyword;

  constructor(
    private studentService: StudentService,
    public matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.getstudent();
  }

  absoluteIndex(indexOnPage: number): number {
    return this.itemsPerPage * (this.p - 1) + indexOnPage;
  }

  async getstudent() {
    await this.studentService.getStudent().then((result) => {
      if (result) {
        this.value = result;
        this.filter_value = result;
      }
    });
  }

  onOpenAddStudentDialog(isEdit, value) {
    const dialogRef = this.matDialog.open(AddStudentDataDialogComponent, {
      data: { isEdit: isEdit, ...(value && { value: value }) },
      height: "60%",
      width: "40%",
      minHeight: "500px",
      minWidth: "600px",
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {

    //   }
    // });
  }

  onOpenStudentDialog(isEdit, value) {
    // const dialogRef = this.matDialog.open(CertificateDataDialogComponent, {
    //   data: { isEdit: isEdit, ...(value && { value: value }) },
    //   height: "60%",
    //   width: "30%",
    //   minHeight: "500px",
    //   minWidth: "500px",
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.getCertificateData();
    //   }
    // });
  }

  onSearching() {
    const value = JSON.parse(JSON.stringify(this.value));

    if (this.keyword && this.keyword.length) {
      this.filter_value = value.filter(
        (item) =>
          item.id.indexOf(this.keyword) > -1 ||
          item.firstname.toLowerCase().indexOf(this.keyword.toLowerCase()) >
            -1 ||
          item.lastname.toLowerCase().indexOf(this.keyword.toLowerCase()) > -1
      );
    } else {
      this.filter_value = value;
    }
  }

  onClearSearching() {
    this.keyword = null;
    this.onSearching();
  }
}
