import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { PathConfigService } from "./path-config.service";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  constructor(
    private http: HttpClient,
    private pathConfigService: PathConfigService
  ) {}

  async getStudent() {
    let result = await this.http
      .post<any>(this.pathConfigService.apiPath + "getStudent.php", null, {
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

  async addStudent(value) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "createStudent.php",
        { student: value },
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

  async updateStudentById(value) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "updateStudentById.php",
        { student: value },
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

  async getStudentById(value) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "getStudentById.php",
        { student_id: value },
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

  async deleteStudent(value) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "deleteStudentById.php",
        { student_id: value },
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
