import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CertificateDataService } from "src/app/services/certificate-data.service";

@Component({
  selector: "app-certificate-publishing",
  templateUrl: "./certificate-publishing.component.html",
  styleUrls: ["./certificate-publishing.component.css"],
})
export class CertificatePublishingComponent implements OnInit {
  cert_type;
  season_value;
  module_value;
  graduate_value;
  honor_cert;
  general_cert;
  diploma;

  constructor(
    private activatedRoute: ActivatedRoute,
    private certificateDataService: CertificateDataService
  ) {
    let id;
    this.activatedRoute.queryParams.subscribe((params) => {
      id = params.id;
    });

    if (id) {
      this.getSeason(id).then(() => {
        this.getCourseByModuleId(this.season_value.m_id);
        this.getGraduateById(id, this.season_value.degree_of_module_id);
        this.getCertType();
      });
    }
  }

  ngOnInit() {}

  async getSeason(id) {
    await this.certificateDataService.getSeason(id).then((result) => {
      if (result) {
        this.season_value = result;
      }
    });
  }

  async getCourseByModuleId(module_id) {
    await this.certificateDataService
      .getCourseByModuleId(module_id)
      .then((result) => {
        if (result) {
          this.module_value = result;
        }
      });
  }

  async getGraduateById(id, degree) {
    await this.certificateDataService
      .getGraduateById(id, degree)
      .then((result) => {
        if (result) {
          this.graduate_value = result;
          this.honor_cert = this.getHonorCert(result);
          this.general_cert = this.getGeneralCert(result);
          this.diploma = this.getDiploma(result);
        }
      });
  }

  async getCertType() {
    await this.certificateDataService.getCertType().then((result) => {
      if (result) {
        this.cert_type = result;
      }
    });
  }

  getHonorCert(item) {
    return Object.values(item).filter(
      (e: any) => e.isCert && e.cert_type_id == 1
    );
  }

  getGeneralCert(item) {
    return Object.values(item).filter(
      (e: any) => e.isCert && e.cert_type_id == 2
    );
  }

  getDiploma(item) {
    return Object.values(item).filter((e: any) => !e.isCert && e.isDiploma);
  }

  getTotal(value) {
    if (value.isCert) {
      return this.cert_type[value.cert_type_id].cert_type_name_th;
    } else if (value.isDiploma) {
      return "ใบรับรอง";
    } else {
      return "-";
    }
  }
}
