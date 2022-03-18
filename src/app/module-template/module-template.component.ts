import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-module-template",
  templateUrl: "./module-template.component.html",
  styleUrls: ["./module-template.component.css"],
})
export class ModuleTemplateComponent implements OnInit {
  @Input() value: any;

  constructor() {}

  ngOnInit() {}
  onNavigate(url) {
    window.location.href = url;
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
}
