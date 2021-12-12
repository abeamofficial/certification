import { Component, OnInit } from "@angular/core";
import { data } from "src/assets/models/data";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  data = data;
  constructor(private router: Router) {}

  ngOnInit() {}

  isLogOn() {
    return (
      localStorage.getItem("c_login") &&
      localStorage.getItem("c_login") == "true"
    );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem("c_login");
    this.router.navigateByUrl("/login");
  }
}
