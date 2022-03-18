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

  constructor(private authenticationService: AuthenticationService) {}

  isAdmin() {
    return (
      this.authenticationService.currentUserValue &&
      this.authenticationService.currentUserValue.role_id == "1"
    );
  }
}
