import { HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { data, competency_level } from "src/assets/models/data";

import { CertificateService } from "../services/certificate.service";
import { ModuleService } from "../services/module.service";
import { AuthenticationService } from "../services/authentication.service";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

@Component({
  selector: "app-achievement-cert-detail",
  templateUrl: "./achievement-cert-detail.component.html",
  styleUrls: ["./achievement-cert-detail.component.css"],
})
export class AchievementCertDetailComponent implements OnInit {
  value;

  isLoading = false;
  constructor(
    private route: ActivatedRoute,
    private certificateService: CertificateService,
    private authenticationService: AuthenticationService,
    private moduleService: ModuleService
  ) {
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

  ngOnInit() {}

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
    window.open(url, "_blank");
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

  onDownloadFile() {
    this.isLoading = true;
    html2canvas(document.querySelector("#printableArea")).then((canvas) => {
      this.isLoading = false;
      var imgData = canvas.toDataURL("image/png");
      var doc = new jsPDF("l", "mm", "a4");

      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, width, height);

      window.open(doc.output("bloburl").toString(), "_blank");
    });
  }

  // imageDownload() {
  //   html2canvas(document.querySelector("#printableArea")).then(function (
  //     canvas
  //   ) {
  //     var imgData = canvas.toDataURL("image/png");
  //     // document.body.appendChild(canvas);
  //     var doc = new jsPDF("l", "mm", "a4");

  //     var width = doc.internal.pageSize.getWidth();
  //     var height = doc.internal.pageSize.getHeight();
  //     doc.addImage(imgData, "PNG", 0, 0, width, height);
  //     window.open(doc.output("bloburl").toString(), "_blank");
  //   });
  // }
}
