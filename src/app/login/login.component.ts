import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {
    if (this.isLogOn()) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {}

  login() {
    localStorage.setItem("c_login", "true");
    this.router.navigate(["/"]);
  }

  isLogOn() {
    return (
      localStorage.getItem("c_login") &&
      localStorage.getItem("c_login") == "true"
    );
  }
}
