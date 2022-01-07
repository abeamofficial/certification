import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PathConfigService {
  constructor() {}

  public get apiPath() {
    if (
      window.location.pathname.substring(0, 5) === "/dev/" ||
      window.location.hostname === "localhost"
    ) {
      return "https://digitech.sut.ac.th/dev/certification-API-Dev/";
    } else {
      return "https://digitech.sut.ac.th/certification-API/";
    }
  }
}
