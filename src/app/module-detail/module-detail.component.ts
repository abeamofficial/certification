import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { data, competency_level } from "src/assets/models/data";

import { ModuleService } from "../services/module.service";

@Component({
  selector: "app-module-detail",
  templateUrl: "./module-detail.component.html",
  styleUrls: ["./module-detail.component.css"],
})
export class ModuleDetailComponent implements OnInit {
  value;

  constructor(
    private route: ActivatedRoute,
    private moduleService: ModuleService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.moduleService.getModuleById(params.id).then((module) => {
          if (module && module.course) {
            this.value = module;
          }
        });
        // this.value = data.module.find((item) => item.id == params.id);
      }
    });
  }
}
