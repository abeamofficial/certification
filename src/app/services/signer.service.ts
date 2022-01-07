import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { PathConfigService } from "./path-config.service";

@Injectable({
  providedIn: "root",
})
export class SignerService {
  constructor(
    private http: HttpClient,
    private pathConfigService: PathConfigService
  ) {}

  async getSigner() {
    let result = await this.http
      .post<any>(this.pathConfigService.apiPath + "getSigner.php", null, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .toPromise();

    if (result.status === 200) {
      return result.data;
    } else {
      return false;
    }
  }

  async createSigner(fileToUpload: File, signerValue: object) {
    const URL =
      this.pathConfigService.apiPath +
      "createSigner.php?signer=" +
      JSON.stringify(signerValue);

    const formData: FormData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);

    let result = await this.http.post<any>(URL, formData).toPromise();

    if (result.status === 200) {
      return true;
    } else {
      return false;
    }
  }
}
