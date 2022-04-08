import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

import { CertificateService } from "src/app/services/certificate.service";
import { GraduationService } from "src/app/services/graduation.service";
import { CourseService } from "src/app/services/course.service";

import { CertificatePublishingDialogComponent } from "../dialog/certificate-publishing-dialog/certificate-publishing-dialog.component";

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
    private certificateDataService: CertificateService,
    private graduationService: GraduationService,
    private courseService: CourseService,
    public matDialog: MatDialog
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

  onOpenCertificatePublishingDialog() {
    this.matDialog.open(CertificatePublishingDialogComponent, {
      data: { isEdit: false, season_value: this.season_value },
      height: "60%",
      width: "30%",
      minHeight: "500px",
      minWidth: "500px",
    });
  }

  async getSeason(id) {
    await this.certificateDataService.getSeason(id).then((result) => {
      if (result) {
        this.season_value = result;
      }
    });
  }

  async getCourseByModuleId(module_id) {
    await this.courseService.getCourseByModuleId(module_id).then((result) => {
      if (result) {
        this.module_value = result;
      }
    });
  }

  async getGraduateById(id, degree) {
    await this.graduationService.getGraduateById(id, degree).then((result) => {
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
      return this.cert_type[value.cert_type_id].name_th;
    } else if (value.isDiploma) {
      return "ใบรับรอง";
    } else {
      return "-";
    }
  }
}
