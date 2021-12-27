import { Component, OnInit } from "@angular/core";
import { Route, Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}

  isActiveRouter(router) {
    let endIndex = this.router.url.indexOf("?", 0);
    if (endIndex == -1) {
      endIndex = this.router.url.length;
    }

    return this.router.url.substring(0, endIndex) == router;
  }

  onNavigateByRouter(value) {
    this.router.navigateByUrl(value);
  }
}
