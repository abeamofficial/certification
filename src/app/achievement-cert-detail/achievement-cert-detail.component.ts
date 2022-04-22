import { HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { data, competency_level } from "src/assets/models/data";

import { CertificateService } from "../services/certificate.service";
import { ModuleService } from "../services/module.service";
import { AuthenticationService } from "../services/authentication.service";
import { CalculationService } from "../services/calculation.service";

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
    private moduleService: ModuleService,
    private calculationService: CalculationService
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

  getScoreLevel(value) {
    return this.calculationService.getScoreLevel(value);
  }

  getSummaryScore(value) {
    return this.calculationService.getSummaryScore(value);
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

  addEvent(el, type, fn) {
    if (el.addEventListener) el.addEventListener(type, fn, false);
    else el.attachEvent("on" + type, fn);
  }

  extend(obj, ext) {
    for (var key in ext) if (ext.hasOwnProperty(key)) obj[key] = ext[key];
    return obj;
  }

  fitText(el, compressor) {
    // let el = document.getElementsByClassName(className);
    let options = 1;
    var settings = this.extend(
      {
        minFontSize: -1 / 0,
        maxFontSize: 1 / 0,
      },
      options
    );

    if (el.length)
      for (var i = 0; i < el.length; i++) this.fit(el[i], settings, compressor);
    else this.fit(el, settings, compressor);

    // return set of elements
    return el;
  }

  fit(el, settings, compressor) {
    var resizer = function () {
      el.style.fontSize =
        Math.max(
          Math.min(
            el.clientWidth / (compressor * 10),
            parseFloat(settings.maxFontSize)
          ),
          parseFloat(settings.minFontSize)
        ) + "px";
      // el.style.lineHeight = Math.max(Math.min(el.clientWidth / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + "px";
    };

    // Call once to set.
    resizer();

    // Bind events
    // If you have any js library which support Events, replace this part
    // and remove addEvent function (or use original jQuery version)
    this.addEvent(window, "resize", resizer);
    this.addEvent(window, "orientationchange", resizer);
  }

  calElementSize() {
    this.fitText(document.getElementsByClassName("c-text-1"), 1.525);
    this.fitText(document.getElementsByClassName("c-text-2"), 1.225);
    this.fitText(document.getElementsByClassName("c-text-3"), 2.35);
    this.fitText(document.getElementsByClassName("name"), 1.85);
    this.fitText(document.getElementsByClassName("c-text-4"), 2.5);

    if (document.getElementsByClassName("watermark").length) {
      this.fitText(document.getElementsByClassName("watermark"), 1.15);
    }
    // if (document.getElementsByClassName('cert-text-1').length) {
    //   this.fitText(document.getElementsByClassName('cert-text-1'), 1.2)
    //   this.fitTextLine(document.getElementsByClassName('cert-text-1'), 1.2)
    // }
  }

  onDownloadFile() {
    this.isLoading = true;

    const element = document.querySelector("#appBody");
    element.classList.add("stop-scroll");

    this.calElementSize();

    html2canvas(document.querySelector("#printableArea")).then((canvas) => {
      this.isLoading = false;
      element.classList.remove("stop-scroll");
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
