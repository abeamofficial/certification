import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { PathConfigService } from "./path-config.service";

@Injectable({
  providedIn: "root",
})
export class BadgeService {
  constructor(
    private http: HttpClient,
    private pathConfigService: PathConfigService
  ) {}

  async getBadge() {
    let result = await this.http
      .post<any>(this.pathConfigService.apiPath + "getBadge.php", null, {
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
}
