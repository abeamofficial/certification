import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { PathConfigService } from "./path-config.service";

@Injectable({
  providedIn: "root",
})
export class CertificateDataService {
  constructor(
    private http: HttpClient,
    private pathConfigService: PathConfigService
  ) {}

  async getCertificate() {
    let result = await this.http
      .post<any>(this.pathConfigService.apiPath + "getCertificate.php", null, {
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
        this.pathConfigService.apiPath + "getSeasonById.php",
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

  async getCertType() {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "getCertificateType.php",
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

  // $scope.getModule = function () {
  //   $http.post("https://digitech.sut.ac.th/api/api_module.php", null).then(function (response) {
  //     if (response.data) {
  //       $scope.module = response.data.data;
  //     }
  //   });
  // };
}
