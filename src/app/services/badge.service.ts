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

  async getBadgeByUserId(id: string) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "getBadgeByUserId.php",
        {
          user_id: id,
        },
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

  async getBadgeById(id: string, user_id: string) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "getBadgeById.php",
        {
          id: id,
          user_id: user_id,
        },
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
