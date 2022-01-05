import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { async } from "@angular/core/testing";

@Injectable({
  providedIn: "root",
})
export class CertificateDataService {
  constructor(private http: HttpClient) {}

  async getCertificate() {
    let result = await this.http
      .post<any>("https://digitech.sut.ac.th/api/api_cert.php", null, {
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

  async getGraduateList() {
    let result = await this.http
      .post<any>("https://digitech.sut.ac.th/api/api_graduate_list.php", null, {
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

  async getSeason(id) {
    let result = await this.http
      .post<any>(
        "https://digitech.sut.ac.th/api/api_season_by_id.php",
        { season_id: id },
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

  async getCourseByModuleId(module_id) {
    let result = await this.http
      .post<any>(
        "https://digitech.sut.ac.th/api/api_module_by_id.php",
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

  async getGraduateById(id, degree) {
    let result = await this.http
      .post<any>(
        "https://digitech.sut.ac.th/api/api_graduate_by_season_id.php",
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

  async getCertType() {
    let result = await this.http
      .post<any>("https://digitech.sut.ac.th/api/api_cert_type.php", null, {
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

  async getModule() {
    let result = await this.http
      .post<any>("https://digitech.sut.ac.th/api/api_module.php", null, {
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

  async getCourse() {
    let result = await this.http
      .post<any>("https://digitech.sut.ac.th/api/api_course.php", null, {
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

  // $scope.getModule = function () {
  //   $http.post("https://digitech.sut.ac.th/api/api_module.php", null).then(function (response) {
  //     if (response.data) {
  //       $scope.module = response.data.data;
  //     }
  //   });
  // };
}
