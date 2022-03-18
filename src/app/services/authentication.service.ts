import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { PathConfigService } from "./path-config.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private pathConfigService: PathConfigService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("certification_account"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  async login(username: string, password: string) {
    let result = await this.http
      .post<any>(
        this.pathConfigService.apiPath + "login.php",
        { username: username, password: password },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .toPromise();

    if (result.status === 200) {
      localStorage.setItem(
        "certification_account",
        JSON.stringify(result.data)
      );
      this.currentUserSubject.next(result.data);

      return true;
    } else {
      return false;
    }

    // localStorage.setItem(
    //   "currentUser",
    //   JSON.stringify(username ? username : "user")
    // );
    // this.currentUserSubject.next(username ? username : "user");
    // this.router.navigate(["/"]);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("certification_account");
    this.currentUserSubject.next(null);
    this.router.navigate(["/login"]);
  }
}
