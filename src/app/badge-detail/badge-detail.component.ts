import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { data, competency_level } from "src/assets/models/data";

import { BadgeService } from "../services/badge.service";
import { AuthenticationService } from "../services/authentication.service";
import { CalculationService } from "../services/calculation.service";

@Component({
  selector: "app-badge-detail",
  templateUrl: "./badge-detail.component.html",
  styleUrls: ["./badge-detail.component.css"],
})
export class BadgeDetailComponent implements OnInit {
  value;
  course_detail;

  constructor(
    private route: ActivatedRoute,
    private badgeService: BadgeService,
    private authenticationService: AuthenticationService,
    private calculationService: CalculationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.badgeService
          .getBadgeById(
            params.id,
            this.authenticationService.currentUserValue.id
          )
          .then((result) => {
            this.value = result;
          });
        // this.value = data.badge.find((item) => item.id == params.id);
        // this.course_detail = data.course.find(
        //   (item) => item.id == this.value.course_id
        // );
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

  getSummaryScore(value) {
    return this.calculationService.getSummaryScore(value);
  }

  getScoreLevel(value) {
    return this.calculationService.getScoreLevel(value);
  }

  onNavigate(url) {
    window.open(url, "_blank");
  }

  ngAfterViewInit() {
    this.calElementSize();
  }

  calElementSize() {
    if (document.getElementsByClassName("watermark").length) {
      this.fitText(document.getElementsByClassName("watermark"), 1);
    }
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
}
