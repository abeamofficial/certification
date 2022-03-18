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

import { MatSelect } from "@angular/material/select";
import { ReplaySubject, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";

import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from "ngx-file-drop";

import { CertificateService } from "src/app/services/certificate.service";
import { CourseService } from "src/app/services/course.service";

@Component({
  selector: "app-badge-data-dialog",
  templateUrl: "./badge-data-dialog.component.html",
  styleUrls: ["./badge-data-dialog.component.css"],
})
export class BadgeDataDialogComponent implements OnInit {
  badgeForm = this.fb.group({
    id: null, // record id
    img_gold: null,
    img_silver: null,
    badge_gold_id: null,
    badge_silver_id: null,
    c_id: null,
  });

  url = { gold: null, silver: null };
  fileToUpload;

  /** list of course */
  course = null;

  /** control for the MatSelect filter keyword */
  public courseFilterCtrl: FormControl = new FormControl();

  /** list of course filtered by search keyword */
  public filteredCourse: ReplaySubject<any> = new ReplaySubject<any>(1);

  @ViewChild("singleSelect", {}) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<BadgeDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private certificateDataService: CertificateService,
    private courseService: CourseService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.value) {
      this.badgeForm.patchValue({
        id: this.data.value.id, // record id
        img_gold: this.data.value.file_name,
        img_silver: this.data.value.file_name,
        badge_gold_id: this.data.value.badge_id,
        badge_silver_id: this.data.value.badge_id,
        c_id: this.data.value.c_id,
      });

      this.url.gold =
        "./../../certification-img/badge/gold/" + this.data.value.file_name;
      this.url.silver =
        "./../../certification-img/badge/silver/" + this.data.value.file_name;
    }

    this.getCourse().then(() => {
      // load the initial course list
      this.filteredCourse.next(this.course.slice());

      // listen for search field value changes
      this.courseFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterCourse();
        });
    });
  }
  ngAfterViewInit() {
    // this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  async getCourse() {
    await this.courseService.getCourse().then((result) => {
      if (result) {
        this.course = result;
      }
    });
  }

  /**
   * Sets the initial value after the filteredCourse are loaded initially
   */
  protected setInitialValue() {
    this.filteredCourse
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredCourse are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: any, b: any) =>
          a && b && a.m_id === b.m_id;
      });
  }

  protected filterCourse() {
    if (!this.course) {
      return;
    }
    // get the search keyword
    let search = this.courseFilterCtrl.value;
    if (!search) {
      this.filteredCourse.next(this.course.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
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

  onCloseModal() {
    this.dialogRef.close();
  }

  // public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[], fieldName: string) {
    if (files[0] && files[0].fileEntry.isFile) {
      this.badgeForm.controls["img_" + fieldName].setValue(
        files[0].relativePath
      );

      const reader = new FileReader();
      const fileEntry = files[0].fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        // this.fileToUpload = file;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.url[fieldName] = reader.result;
        };
      });
    }
  }

  removeImg(fieldName: string) {
    this.badgeForm.controls["img_" + fieldName].setValue(null);
    this.url[fieldName] = null;
  }

  getCourseName(c_id) {
    if (!this.course) {
      return;
    }
    let course = this.course.find((item) => item.c_id == c_id);
    return course.course_id + " " + course.course_name_th;
  }

  get id() {
    return this.badgeForm.get("id").value;
  }

  get c_id() {
    return this.badgeForm.get("c_id").value;
  }

  get img_gold() {
    return this.badgeForm.get("img_gold").value;
  }

  get img_silver() {
    return this.badgeForm.get("img_silver").value;
  }
}
