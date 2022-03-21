import { HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { data, competency_level } from "src/assets/models/data";

import { CertificateService } from "../services/certificate.service";
import { ModuleService } from "../services/module.service";
import { AuthenticationService } from "../services/authentication.service";
@Component({
  selector: "app-achievement-cert-detail",
  templateUrl: "./achievement-cert-detail.component.html",
  styleUrls: ["./achievement-cert-detail.component.css"],
})
export class AchievementCertDetailComponent implements OnInit {
  value;
  constructor(
    private route: ActivatedRoute,
    private certificateService: CertificateService,
    private authenticationService: AuthenticationService,
    private moduleService: ModuleService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.certificateService
          .getCertificateOfAchievementById(
            this.authenticationService.currentUserValue.id,
            params.id
          )
          .then((result) => {
            this.value = result;
            this.moduleService.getModuleById(this.value.m_id).then((module) => {
              if (module && module.course) {
                this.value.module_detail = module;
              }
            });
          });
      }
    });
  }

  getCompetencyLevel(score) {
    let competency_name;
    Object.entries(competency_level).forEach(([key, item]) => {
      if (score >= item.score_min && score <= item.score_max) {
        competency_name = key;
      }
    });
    return competency_name;
  }

  getSummaryScore(objective_score, practice_score) {
    return Math.floor(Number(objective_score) + Number(practice_score));
  }

  onNavigate(url) {
    window.location.href = url;
  }

  scrollToId($event) {
    const element = document.getElementById(
      $event.index == 0 ? "about" : $event.index == 1 ? "course" : "institution"
    );
    const offset = 100;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    // document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  }

  onDownloadFile(filePath) {
    // let headers = new HttpHeaders();
    // headers = headers.set('Accept', 'application/pdf');
    // return this.http.get(filePath, { headers: headers, responseType: 'blob' });
  }
}
