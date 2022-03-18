import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../services/authentication.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  userForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
    recaptchaReactive: [null, Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    if (this.isLogOn()) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {}

  login() {
    if (this.userForm.valid) {
      this.authenticationService
        .login(
          this.userForm.controls["username"].value,
          this.userForm.controls["password"].value
        )
        .then((result) => {
          if (result) {
            this.router.navigate(["/"]);
          } else {
            console.log("error");
          }
        });
    } else {
      console.log("error");
    }

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

  errored() {
    console.warn(`reCAPTCHA error encountered`);
  }
}
