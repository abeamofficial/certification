import { Component, OnInit } from "@angular/core";
import { data, competency_level } from "src/assets/models/data";

import { ActivatedRoute, Router } from "@angular/router";
import { CertificateService } from "../services/certificate.service";
import { ModuleService } from "../services/module.service";

@Component({
  selector: "app-cert-preview",
  templateUrl: "./cert-preview.component.html",
  styleUrls: ["./cert-preview.component.css"],
})
export class CertPreviewComponent implements OnInit {
  value;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private certificateService: CertificateService,
    private moduleService: ModuleService
  ) {
    // this.route.queryParams.subscribe((params) => {
    //   if (params.no) {
    //     this.certificateService
    //       .getCertificateOfAchievementByNo(params.no)
    //       .then((result) => {
    //         if (result) {
    //           this.value = result;
    //           this.moduleService
    //             .getModuleById(this.value.m_id)
    //             .then((module) => {
    //               if (module && module.course) {
    //                 this.value.module_detail = module;
    //               }
    //             });
    //         } else {
    //           this.router.navigate(["/login"]);
    //         }
    //       });
    //   } else {
    //     this.router.navigate(["/login"]);
    //   }
    // });
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
}
