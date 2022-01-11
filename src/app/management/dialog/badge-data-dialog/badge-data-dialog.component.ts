import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  Inject,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
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

import { CertificateDataService } from "src/app/services/certificate-data.service";
import { CourseService } from "src/app/services/course.service";

@Component({
  selector: "app-badge-data-dialog",
  templateUrl: "./badge-data-dialog.component.html",
  styleUrls: ["./badge-data-dialog.component.css"],
})
export class BadgeDataDialogComponent implements OnInit {
  /** list of course */
  course = [];

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
    private certificateDataService: CertificateDataService,
    private courseService: CourseService
  ) {
    if (!this.data.value) {
      this.data["value"] = {
        cert_name_th: null,
        cert_name_en: null,
        m_id: null,
      };
    }
  }

  ngOnInit() {
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

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
