import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { PathConfigService } from "./path-config.service";

@Injectable({
  providedIn: "root",
})
export class GraduationService {
  constructor(
    private http: HttpClient,
    private pathConfigService: PathConfigService
  ) {}

  async getGraduateList() {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "getGraduationList.php",
        null,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .toPromise();

    if (result.status === 200) {
      return result.data;
    } else {
      return false;
    }
  }

  async getGraduateById(id, degree) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "getGraduationBySeasonId.php",
        { season_id: id, degree_of_module_id: degree },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .toPromise();

    if (result.status === 200) {
      return result.data;
    } else {
      return false;
    }
  }

  async getAttendanceAmount() {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "getAttendanceAmount.php",
        null,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .toPromise();

    if (result.status === 200) {
      return result.data;
    } else {
      return false;
    }
  }
}
