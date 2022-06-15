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
import { SeasonService } from "src/app/services/season.service";

import { MatSelect } from "@angular/material/select";
import { ReplaySubject, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-season-data-dialog",
  templateUrl: "./season-data-dialog.component.html",
  styleUrls: ["./season-data-dialog.component.css"],
})
export class SeasonDataDialogComponent implements OnInit {
  seasonForm = this.fb.group({
    id: null, // record id
    m_id: null,
    season: null,
    create_date: null,
  });

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
    public dialogRef: MatDialogRef<SeasonDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private moduleService: ModuleService,
    private seasonService: SeasonService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.value) {
      this.seasonForm.patchValue(this.data.value);
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
  }

  async getModule() {
    await this.moduleService.getModule().then((result) => {
      if (result) {
        this.module = result;
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
    this.seasonService.addSeason(this.seasonForm.value).then((result) => {
      if (result) {
        this.onCloseModal(true);
      } else {
        //
      }
    });
  }

  onCloseModal(isModify) {
    this.dialogRef.close(isModify);
  }

  get id() {
    return this.seasonForm.get("id").value;
  }
}
