import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { data, competency_level } from "src/assets/models/data";

@Component({
  selector: "app-module-detail",
  templateUrl: "./module-detail.component.html",
  styleUrls: ["./module-detail.component.css"],
})
export class ModuleDetailComponent implements OnInit {
  value;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.value = data.module.find((item) => item.id == params.id);
      }
    });
  }
}
