import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { PathConfigService } from "./path-config.service";
@Injectable({
  providedIn: "root",
})
export class EnrollService {
  constructor(
    private http: HttpClient,
    private pathConfigService: PathConfigService
  ) {}

  async getEnrollData() {
    let result = await this.http
      .post<any>(this.pathConfigService.apiPath + "getEnroll.php", null, {
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

  async createEnrollByCourseId(value) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "createEnrollByCourseId.php",
        null,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .toPromise();

    if (result.status === 200) {
      return true;
    } else {
      return false;
    }
  }

  async createEnrollByModuleId(value) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "createEnrollByModuleId.php",
        null,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .toPromise();

    if (result.status === 200) {
      return true;
    } else {
      return false;
    }
  }
}
