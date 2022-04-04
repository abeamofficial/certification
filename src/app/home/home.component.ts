import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  user;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(
      (item) => (this.user = item && item.role_id !== "1")
    );
  }

  ngOnInit() {
    if (!this.user) {
    }
  }
}
