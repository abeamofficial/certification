import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { CertificateDataService } from "src/app/services/certificate-data.service";
import { GraduationService } from "src/app/services/graduation.service";

@Component({
  selector: "app-certificate-summary",
  templateUrl: "./certificate-summary.component.html",
  styleUrls: ["./certificate-summary.component.css"],
})
export class CertificateSummaryComponent implements OnInit {
  p: number = 1;
  itemsPerPage = 10;
  graduate_list = null;

  constructor(
    private graduationService: GraduationService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getGraduateList();
  }

  async getGraduateList() {
    await this.graduationService.getGraduateList().then((result) => {
      if (result) {
        this.graduate_list = result;
      }
    });
  }

  scrollUp() {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  }

  onNavigateByRouter(value) {
    this.router.navigateByUrl(value);
  }
}
