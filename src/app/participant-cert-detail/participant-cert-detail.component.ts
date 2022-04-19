import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { data, competency_level } from "src/assets/models/data";
import { CertificateService } from "../services/certificate.service";
import { AuthenticationService } from "../services/authentication.service";
import { ModuleService } from "../services/module.service";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import moment from "moment";

@Component({
  selector: "app-participant-cert-detail",
  templateUrl: "./participant-cert-detail.component.html",
  styleUrls: ["./participant-cert-detail.component.css"],
})
export class ParticipantCertDetailComponent implements OnInit {
  value;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private certificateService: CertificateService,
    private authenticationService: AuthenticationService,
    private moduleService: ModuleService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.route.params.subscribe((params) => {
          if (params.id) {
            this.certificateService
              .getCertificateOfParticipantById(
                this.authenticationService.currentUserValue.id,
                params.id
              )
              .then((result) => {
                this.value = result;
                this.moduleService
                  .getModuleById(this.value.m_id)
                  .then((module) => {
                    if (module && module.course) {
                      this.value.module_detail = module;
                    }
                  });
              });
          }
        });
      }
    });
  }

  getDate(value) {
    return moment(value).format("DD/MM/yyyy");
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
}
