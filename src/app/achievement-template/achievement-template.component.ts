import { Component, ElementRef, OnInit, ViewChild, Input } from "@angular/core";
import QRCode from "easyqrcodejs";

import moment from "moment";

@Component({
  selector: "app-achievement-template",
  templateUrl: "./achievement-template.component.html",
  styleUrls: ["./achievement-template.component.css"],
})
export class AchievementTemplateComponent implements OnInit {
  @ViewChild("qrcode", {}) qrcode: ElementRef;

  @Input() value: any;
  qrgen = false;

  constructor() {}

  ngOnInit() {
    if (this.value) {
      this.value.cert_approved_thai_date = this.dateThai(
        this.value.cert_approved_date
      );
    }

    // if (
    //   !document.getElementsByClassName("c-text-1") ||
    //   !document.getElementsByClassName("c-text-1").length
    // ) {

    setTimeout(() => {
      this.calElementSize();
    }, 1000);
    // }
  }

  ngAfterViewInit() {
    this.calElementSize();
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

    if (!this.qrgen && this.value) {
      var options = {
        text:
          "https://digitech.sut.ac.th/certification/cpw/?no=" +
          this.value.cert_hash,
      };

      // Create new QRCode Object
      new QRCode(this.qrcode.nativeElement, options);

      let canvas = document.getElementsByTagName("canvas");
      Object.values(canvas).forEach((element) => {
        element.style.width = "100%";
        element.style.position = "absolute";
        element.style.top = "0";
      });

      this.qrgen = true;
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

  dateThai(strDate) {
    let date = new Date(strDate);
    let strYear = (Number(moment(strDate).format("YYYY")) + 543).toString();
    let strMonth = moment(strDate).format("M").toString();
    let strDay = moment(strDate).format("DD").toString();
    let strMonthCut = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];

    let strThai = ["๐", "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙"];

    let strMonthThai = strMonthCut[strMonth];
    let strDayThai = "";
    let strYearThai = "";

    for (let i = 0; i < strDay.length; i++) {
      strDayThai += strThai[strDay[i]];
    }
    for (let i = 0; i < strYear.length; i++) {
      strYearThai += strThai[strYear[i]];
    }

    return strDayThai + " " + strMonthThai + " พ.ศ." + " " + strYearThai;
  }
}
