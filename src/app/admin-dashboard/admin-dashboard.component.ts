import { Component, OnInit } from "@angular/core";

import { CertificateDataService } from "../services/certificate-data.service";
import { ModuleService } from "../services/module.service";
import { GraduationService } from "../services/graduation.service";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
})
export class AdminDashboardComponent implements OnInit {
  certificate_amount;
  module_amount;
  attendance_amount;
  recent_certificate;
  popular_course;

  constructor(
    private certificateDataService: CertificateDataService,
    private moduleService: ModuleService,
    private graduationService: GraduationService
  ) {}

  ngOnInit() {
    this.getCertificateAmount();
    this.getModuleAmount();
    this.getAttendanceAmount();
    this.getRecentCertificate();
    this.getMostPopularCourse();
  }

  async getCertificateAmount() {
    await this.certificateDataService.getCertificateAmount().then((result) => {
      if (result !== null && result !== undefined) {
        this.certificate_amount = result;
      }
    });
  }

  async getModuleAmount() {
    this.moduleService.getModuleAmount().then((result) => {
      if (result !== null && result !== undefined) {
        this.module_amount = result;
      }
    });
  }

  async getAttendanceAmount() {
    this.graduationService.getAttendanceAmount().then((result) => {
      if (result !== null && result !== undefined) {
        this.attendance_amount = result;
      }
    });
  }

  async getRecentCertificate() {
    this.graduationService.getGraduateList().then((result) => {
      if (result) {
        this.recent_certificate = result
          .filter((item) => item.public)
          .sort((a, b) => {
            return <any>new Date(b.public_date) - <any>new Date(a.public_date);
          });
      }
    });
  }

  async getMostPopularCourse() {
    this.moduleService.getMostPopularCourse().then((result) => {
      if (result) {
        this.popular_course = result.sort((a, b) => {
          return Number(b.amount) - Number(a.amount);
        });
      }
    });
  }
}
