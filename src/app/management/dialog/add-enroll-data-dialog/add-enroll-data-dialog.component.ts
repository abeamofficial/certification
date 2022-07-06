import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  Inject,
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";

import { ModuleService } from "src/app/services/module.service";
import { CourseService } from "src/app/services/course.service";
import { SeasonService } from "src/app/services/season.service";
import { EnrollService } from "src/app/services/enroll.service";

import { MatSelect } from "@angular/material/select";
import { ReplaySubject, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import * as XLSX from "xlsx";

@Component({
  selector: "app-add-enroll-data-dialog",
  templateUrl: "./add-enroll-data-dialog.component.html",
  styleUrls: ["./add-enroll-data-dialog.component.css"],
})
export class AddEnrollDataDialogComponent implements OnInit {
  constructor(
    private moduleService: ModuleService,
    private courseService: CourseService,
    private seasonService: SeasonService,
    private enrollService: EnrollService,
    public dialogRef: MatDialogRef<AddEnrollDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  season;
  inputFileName;
  studentInputText;
  enrollInputText;

  enrollForm = this.fb.group({
    enroll: null,
    course: null,
    season_id: null,
  });

  /** list of module */
  module = [];
  course = [];

  /** control for the MatSelect filter keyword */
  public moduleFilterCtrl: FormControl = new FormControl();

  /** list of module filtered by search keyword */
  public filteredModule: ReplaySubject<any> = new ReplaySubject<any>(1);
  public filteredCourse: ReplaySubject<any> = new ReplaySubject<any>(1);

  @ViewChild("singleSelect", {}) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  ngOnInit() {
    this.getModule().then(() => {
      this.getCourse().then(() => {
        // load the initial module list
        this.filteredModule.next(this.module.slice());
        this.filteredCourse.next(this.course.slice());

        // listen for search field value changes
        this.moduleFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterModule();
          });
      });
    });
  }

  protected filterModule() {
    if (!this.module || !this.course) {
      return;
    }
    // get the search keyword
    let search = this.moduleFilterCtrl.value;
    if (!search) {
      this.filteredModule.next(this.module.slice());
      this.filteredCourse.next(this.course.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the module
    this.filteredModule.next(
      this.module.filter(
        (module) =>
          module.module_id.indexOf(search) > -1 ||
          module.module_name_th.toLowerCase().indexOf(search) > -1 ||
          module.module_name_en.toLowerCase().indexOf(search) > -1
      )
    );
    // filter the course
    this.filteredCourse.next(
      this.course.filter(
        (course) =>
          course.course_id.indexOf(search) > -1 ||
          course.course_name_th.toLowerCase().indexOf(search) > -1 ||
          course.course_name_en.toLowerCase().indexOf(search) > -1
      )
    );
  }

  async getModule() {
    await this.moduleService.getModule().then((result) => {
      if (result) {
        this.module = result;
      }
    });
  }

  async getCourse() {
    await this.courseService.getCourse().then((result) => {
      if (result) {
        this.course = result;
      }
    });
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
      value.split(/\s/).map((value_, index) => {
        if (this.checkID(value_)) {
          if (ary.findIndex((item) => item == value_) == -1) {
            ary.push(value_);
          } else {
            alert("ข้อมูล input ซ้ำที่ ID : " + value_);
            isError = true;
            return;
          }
        } else {
          alert("ID : " + value_ + " ไม่ถูกต้อง");
          isError = true;
          return;
        }
      });
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

  getSeason(event) {
    if (event.value) {
      this.enrollForm.patchValue({
        course: event.value,
      });
    }

    if ("m_id" in event.value) {
      this.getSeasonByModuleId(event.value).then((result) => {
        if (result) {
          this.season = result;
          return;
        }
      });
    } else if ("c_id" in event.value) {
      this.getSeasonByCourseId(event.value).then((result) => {
        if (result) {
          this.season = result;
          return;
        }
      });
    } else {
      this.season = null;
    }
  }

  async getSeasonByModuleId(value) {
    return this.seasonService.getSeasonByModuleId(value);
  }

  async getSeasonByCourseId(value) {
    return this.seasonService.getSeasonByCourseId(value);
  }

  onSave() {
    let value = this.validateStudentTextInput();
    if (value) {
      if ("m_id" in this.enrollForm.get(["course"]).value) {
        const value_ = {
          course_id: this.enrollForm.get(["course"]).value,
          enroll: value,
          season_id: this.enrollForm.get(["season_id"]).value,
        };

        console.log(value_);
        // this.enrollService.createEnrollByCourseId(value_).then((result) => {
        //   if (result) {
        //     this.onCloseModal(true);
        //   } else {
        //     //
        //   }
        // });
      } else if ("c_id" in this.enrollForm.get(["course"]).value) {
        const value_ = {
          module_id: this.enrollForm.get(["course"]).value,
          enroll: value,
          season_id: this.enrollForm.get(["season_id"]).value,
        };

        console.log(value_);
        // this.enrollService.createEnrollByModuleId(value_).then((result) => {
        //   if (result) {
        //     this.onCloseModal(true);
        //   } else {
        //     //
        //   }
        // });
      } else {
        return;
      }
      // this.enrollForm. (value).then((result) => {
      //   if (result) {
      //     this.onCloseModal(true);
      //   } else {
      //     //
      //   }
      // });
    }
  }

  onCloseModal(isModify: boolean) {
    this.dialogRef.close(isModify);
  }
}
