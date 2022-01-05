import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  username = null;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.isLogOn()) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {}

  login() {
    this.authenticationService.login(this.username, null);

    // localStorage.setItem("c_login", "true");
    // this.router.navigate(["/"]);
  }

  isLogOn() {
    return this.authenticationService.currentUserValue;
    // return (
    //   localStorage.getItem("c_login") &&
    //   localStorage.getItem("c_login") == "true"
    // );
  }
}
