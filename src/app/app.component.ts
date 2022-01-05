import { Component } from "@angular/core";
import { AuthenticationService } from "./services/authentication.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "certification";
  admin;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(
      (item) => (this.admin = item == "admin")
    );
  }
}
