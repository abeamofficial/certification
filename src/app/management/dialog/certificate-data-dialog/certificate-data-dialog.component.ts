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

import { CertificateDataService } from "src/app/services/certificate-data.service";
import { ModuleService } from "src/app/services/module.service";

import { MatSelect } from "@angular/material/select";
import { ReplaySubject, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
@Component({
  selector: "app-certificate-data-dialog",
  templateUrl: "./certificate-data-dialog.component.html",
  styleUrls: ["./certificate-data-dialog.component.css"],
})
export class CertificateDataDialogComponent implements OnInit {
  certificateForm = this.fb.group({
    id: null, // record id
    cert_name_th: null,
    cert_name_en: null,
    cert_of_module_id: null,
    m_id: null,
    degree_of_module_id: null,
  });

  degree_of_module = null;

  /** list of module */
  module = [];

  /** control for the MatSelect filter keyword */
  public moduleFilterCtrl: FormControl = new FormControl();

  /** list of module filtered by search keyword */
  public filteredModule: ReplaySubject<any> = new ReplaySubject<any>(1);

  @ViewChild("singleSelect", {}) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<CertificateDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private certificateDataService: CertificateDataService,
    private moduleService: ModuleService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.value) {
      this.certificateForm.patchValue(this.data.value);
    }

    this.getModule().then(() => {
      // load the initial module list
      this.filteredModule.next(this.module.slice());

      // listen for search field value changes
      this.moduleFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterModule();
        });
    });

    this.getDegreeOfModule();
  }

  ngAfterViewInit() {
    // this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  async getModule() {
    await this.moduleService.getModule().then((result) => {
      if (result) {
        this.module = result;
      }
    });
  }

  getDegreeOfModule() {
    this.moduleService.getDegreeOfModule().then((result) => {
      if (result) {
        this.degree_of_module = result;
      }
    });
  }

  /**
   * Sets the initial value after the filteredModule are loaded initially
   */
  protected setInitialValue() {
    this.filteredModule
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredModule are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: any, b: any) =>
          a && b && a.m_id === b.m_id;
      });
  }

  protected filterModule() {
    if (!this.module) {
      return;
    }
    // get the search keyword
    let search = this.moduleFilterCtrl.value;
    if (!search) {
      this.filteredModule.next(this.module.slice());
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
  }

  onSave() {
    if (this.id) {
      this.certificateDataService
        .updateCertificateById(this.certificateForm.value)
        .then((result) => {
          if (result) {
            this.onCloseModal(true);
          } else {
          }
        });
    } else {
      this.certificateDataService
        .createCertificate(this.certificateForm.value)
        .then((result) => {
          if (result) {
            this.onCloseModal(true);
          } else {
          }
        });
    }
  }

  onCloseModal(isModify) {
    this.dialogRef.close(isModify);
  }

  getdegreeName(id) {
    if (!this.degree_of_module) return;
    return this.degree_of_module.find((item) => item.id == id)
      .degree_of_module_name;
  }

  get id() {
    return this.certificateForm.get("id").value;
  }

  get cert_name_th() {
    return this.certificateForm.get("cert_name_th").value;
  }

  get cert_name_en() {
    return this.certificateForm.get("cert_name_en").value;
  }

  get m_id() {
    return this.certificateForm.get("m_id").value;
  }

  get module_id() {
    if (!this.module) return;
    return this.module.find(
      (item) => item.m_id == this.certificateForm.get("m_id").value
    ).module_id;
  }

  get module_name_th() {
    if (!this.module) return;
    return this.module.find(
      (item) => item.m_id == this.certificateForm.get("m_id").value
    ).module_name_th;
  }

  get degree_of_module_id() {
    return this.certificateForm.get("degree_of_module_id").value;
  }

  get degree_of_module_name() {
    if (!this.degree_of_module) return;
    return this.degree_of_module.find(
      (item) => item.id == this.certificateForm.get("degree_of_module_id").value
    ).degree_of_module_name;
  }
}

// export class AddUserDialogComponent implements OnInit {
//   constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>) {}

//   mock_student;
//   ngOnInit() {}

//   upload(file: any) {
//     this.mock_student = "BIA01\nBIA02\nBIA03\nBIA05\nBIA06";

//     // console.log(file);
//   }

//   onCloseModal() {
//     this.dialogRef.close();
//   }
// }
