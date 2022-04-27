import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Input,
  HostListener,
} from "@angular/core";

import moment from "moment";

@Component({
  selector: "app-participant-template",
  templateUrl: "./participant-template.component.html",
  styleUrls: ["./participant-template.component.css"],
})
export class ParticipantTemplateComponent implements OnInit {
  @Input() value: any;

  constructor() {}

  @HostListener("window:orientationchange", ["$event"])
  onOrientationChange(event) {
    this.calElementSize();
  }

  ngOnInit() {
    if (this.value) {
      this.value.diploma_approved_thai_date = this.dateThai(
        this.value.diploma_approved_date
      );
    }

    let time = 1000;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      time = 0;
    }

    setTimeout(() => {
      this.calElementSize();
    }, time);
    this.calElementSize();
    this.calElementSize();
  }

  ngAfterViewInit() {
    this.calElementSize();
  }

  calElementSize() {
    this.fitText(document.getElementsByClassName("d-text-1"), 2.25);
    this.fitText(document.getElementsByClassName("d-text-2"), 3.75);
    this.fitText(document.getElementsByClassName("d-text-3"), 3);
    this.fitText(document.getElementsByClassName("d-text-4"), 4.5);
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
    // let date = new Date(strDate);
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
