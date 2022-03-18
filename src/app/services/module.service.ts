import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { PathConfigService } from "./path-config.service";

@Injectable({
  providedIn: "root",
})
export class ModuleService {
  constructor(
    private http: HttpClient,
    private pathConfigService: PathConfigService
  ) {}

  async getModule() {
    let result = await this.http
      .post<any>(this.pathConfigService.apiPath + "getModule.php", null, {
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

  async getDegreeOfModule() {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "getDegreeOfModule.php",
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

  async getModuleAmount() {
    let result = await this.http
      .post<any>(this.pathConfigService.apiPath + "getModuleAmount.php", null, {
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

  async getMostPopularCourse() {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "getMostPopularCourse.php",
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

  async getModuleById(module_id: string) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "getModuleById.php",
        { module_id: module_id },
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
