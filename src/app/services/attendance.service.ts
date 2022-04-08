import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { PathConfigService } from "./path-config.service";

@Injectable({
  providedIn: "root",
})
export class AttendanceService {
  constructor(
    private http: HttpClient,
    private pathConfigService: PathConfigService
  ) {}

  async getAttendanceByUserId(user_id: string) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "getAttendanceByUserId.php",
        { user_id: user_id },
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

  async getCreditByUserId(user_id: string) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "getCreditByUserId.php",
        { user_id: user_id },
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
