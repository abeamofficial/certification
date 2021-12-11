import { Component, OnInit } from "@angular/core";
import { data, competency_level } from "src/assets/models/data";

@Component({
  selector: "app-participant",
  templateUrl: "./participant.component.html",
  styleUrls: ["./participant.component.css"],
})
export class ParticipantComponent implements OnInit {
  value = data.participant_certificate;
  constructor() {}

  ngOnInit() {}
}
