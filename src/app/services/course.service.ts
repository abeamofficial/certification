import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { PathConfigService } from "./path-config.service";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  constructor(
    private http: HttpClient,
    private pathConfigService: PathConfigService
  ) {}

  async getCourse() {
    let result = await this.http
      .post<any>(this.pathConfigService.apiPath + "getCourse.php", null, {
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

  async getCourseByModuleId(module_id) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "getCourseByModuleId.php",
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

  async getCourseById(course_id) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "getCourseById.php",
        { course_id: course_id },
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
