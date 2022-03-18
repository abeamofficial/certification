import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CalculationService {
  constructor() {}

  getScoreLevel(ary) {
    return Number(this.getSummaryScore(ary)) >= 80 ? "gold" : "silver";
  }

  getSummaryScore(ary) {
    const result = ary
      .map(function (i) {
        // assure the value can be converted into an integer
        return /^\d+(\.\d+)?$/.test(i) ? parseFloat(i) : 0;
      })
      .reduce(function (a, b) {
        return a + b;
      })
      .toFixed(2);

    return result;
  }
}
