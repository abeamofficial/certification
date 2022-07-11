import { Component, OnInit, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";
import * as XLSX from "xlsx";
import { StudentService } from "src/app/services/student.service";

@Component({
  selector: "app-add-student-data-dialog",
  templateUrl: "./add-student-data-dialog.component.html",
  styleUrls: ["./add-student-data-dialog.component.css"],
})
export class AddStudentDataDialogComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<AddStudentDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  inputFileName;
  studentInputText;
  header = ["id", "nametitle", "firstname", "lastname"];

  ngOnInit() {}

  onCloseModal(isModify: boolean) {
    this.dialogRef.close(isModify);
  }

  onFileChange(event: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1) {
      alert("Cannot use multiple files");
      // throw new Error("Cannot use multiple files");
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: "binary" });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.inputFileName = target.files[0].name;
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}

      let text = "";
      data.forEach((line) => {
        if (text.length) {
          text += "\n";
        }
        Object.values(line).forEach((value) => {
          if (Object.keys(line).length > 0) {
            text += " ";
          }
          text += value;
        });
      });
      this.studentInputText = text;
    };
  }

  validateStudentTextInput() {
    var ary = [];
    var isError = false;

    for (var value of this.studentInputText.trim().split("\n")) {
      var newObj = {};
      value.split(/\s/).map((value_, index) => {
        if (index == 0) {
          // if (/^(\d{13})?$/.test(value_)) {
          if (this.checkID(value_)) {
            newObj[this.header[index]] = value_;
          } else {
            alert("ID : " + value_ + " ไม่ถูกต้อง");
            isError = true;
            return;
          }
        } else {
          newObj[this.header[index]] = value_;
        }
      });

      if (isError) {
        return;
      }

      if (Object.keys(newObj).length == 4) {
        if (ary.findIndex((item) => item.id == newObj["id"]) == -1) {
          // if ($scope.validateStudentWithData(newObj)) {
          ary.push(newObj);
          // }
        } else {
          alert("ข้อมูล input ซ้ำที่ ID : " + newObj["id"]);
          isError = true;
          return;
        }
      } else {
        alert("ข้อมูลไม่ครบ");
        isError = true;
        return;
      }
    }

    return isError ? false : ary;
  }

  checkID(id) {
    if (!this.IsNumeric(id)) return false;

    if (id.substring(0, 1) == 0) return false;
    if (id.length != 13) return false;
    let sum = 0;

    for (let i = 0; i < 12; i++) {
      sum += parseFloat(id.charAt(i)) * (13 - i);
    }
    if ((11 - (sum % 11)) % 10 != parseFloat(id.charAt(12))) {
      return false;
    }

    return true;
  }

  IsNumeric(input) {
    var RE =
      /^-?(0|INF|(0[1-7][0-7]*)|(0x[0-9a-fA-F]+)|((0|[1-9][0-9]*|(?=[\.,]))([\.,][0-9]+)?([eE]-?\d+)?))$/;

    return RE.test(input);
  }

  onSave() {
    let value = this.validateStudentTextInput();
    if (value) {
      this.studentService.addStudent(value).then((result) => {
        if (result) {
          this.onCloseModal(true);
        } else {
          //
        }
      });
    }
  }
}
