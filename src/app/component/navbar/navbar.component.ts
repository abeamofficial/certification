import { Component, OnInit } from "@angular/core";
import { data } from "src/assets/models/data";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  data = data;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  isLogOn() {
    // console.log(this.authenticationService.currentUserValue() !== null);
    return this.authenticationService.currentUserValue;
    // return (
    //   localStorage.getItem("c_login") &&
    //   localStorage.getItem("c_login") == "true"
    // );
  }

  isAdmin() {
    return this.authenticationService.currentUserValue === "admin";
  }

  logout() {
    this.authenticationService.logout();
    // remove user from local storage and set current user to null
    // localStorage.removeItem("c_login");
    // this.router.navigateByUrl("/login");
  }
}
