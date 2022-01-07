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

    const endpoint = URL;
    const formData: FormData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData).toPromise();

    // let result = await this.http
    //   .post<any>(
    //     this.pathConfigService.apiPath + "createSigner.php",
    //     fileToUpload,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   )
    //   .toPromise();

    // if (result.status === 200) {
    //   return result.data;
    // } else {
    //   return false;
    // }
  }
}
