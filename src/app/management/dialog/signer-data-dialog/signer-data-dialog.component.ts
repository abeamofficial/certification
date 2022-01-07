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

import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from "ngx-file-drop";

import { SignerService } from "src/app/services/signer.service";

@Component({
  selector: "app-signer-data-dialog",
  templateUrl: "./signer-data-dialog.component.html",
  styleUrls: ["./signer-data-dialog.component.css"],
})
export class SignerDataDialogComponent implements OnInit {
  signerForm = this.fb.group({
    id: null, // record id
    prefix_name: null,
    first_name: null,
    last_name: null,
    img: null,
  });

  url;
  fileToUpload;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SignerDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private signerService: SignerService
  ) {}

  ngOnInit() {
    if (this.data.value) {
      this.signerForm.patchValue(this.data.value);
      this.url = "./../../certification-img/signer/" + this.data.value.img;
    }
  }

  onCloseModal(isModify: boolean) {
    this.dialogRef.close(isModify);
  }

  // public files: NgxFileDropEntry = null;

  public dropped(files: NgxFileDropEntry[]) {
    if (files[0] && files[0].fileEntry.isFile) {
      this.signerForm.controls["img"].setValue(files[0].relativePath);

      const reader = new FileReader();
      const fileEntry = files[0].fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        this.fileToUpload = file;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.url = reader.result;
        };
      });
    }
  }

  removeImg() {
    this.signerForm.controls["img"].setValue(null);
    this.url = null;
  }

  async onSaveSigner() {
    await this.signerService
      .createSigner(this.fileToUpload, this.signerForm.value)
      .then((result) => {
        if (result) {
          this.onCloseModal(true);
        } else {
          //alert
        }
      });
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  get img() {
    return this.signerForm.get("img").value;
  }
}
