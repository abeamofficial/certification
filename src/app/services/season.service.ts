import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { PathConfigService } from "./path-config.service";

@Injectable({
  providedIn: "root",
})
export class SeasonService {
  constructor(
    private http: HttpClient,
    private pathConfigService: PathConfigService
  ) {}

  async getSeason() {
    let result = await this.http
      .post<any>(this.pathConfigService.apiPath + "getSeason.php", null, {
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

  async addSeason(value) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "createSeason.php",
        { season: value },
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

  async deleteSeasonById(value) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "deleteSeasonById.php",
        { season_id: value },
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

  async getSeasonByModuleId(value) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "getSeasonByModuleId.php",
        value,
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

  async getSeasonByCourseId(value) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "getSeasonByCourseId.php",
        value,
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
