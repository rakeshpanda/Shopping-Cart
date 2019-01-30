import { Injectable, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";
import "firebase/auth";
import { NGXLogger } from "ngx-logger";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  token: string;
  uid: string;

  constructor(private router: Router, private logger: NGXLogger) {}
  showDialog$ = new EventEmitter<string>();
  signupUser(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.signinUser(email, password);
      })
      .catch(error => {
        this.logger.error(error);
        if (error.code === "auth/email-already-in-use")
          this.showDialog$.emit("User is already signed in");
      });
  }

  signinUser(email: string, password: string) {
    this.logger.info("sign in user with " + email + password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => (this.token = token));
        this.uid = firebase.auth().currentUser.uid;
        this.logger.debug("user authenticated in firebase " + this.uid);

        this.router.navigate(["shopping-list"]);
      })
      .catch(error => {
        this.logger.error(error) ;
        this.showDialog$.emit("Error signing in");
      });
  }

  logout() {
    this.logger.info("user logged out");
    firebase.auth().signOut();
    this.token = null;
    this.uid = null;
    this.router.navigate(['/login']);
  }

  getToken() {
    if (this.isAuthenticated()) {
      firebase
        .auth()
        .currentUser.getIdToken()
        .then((token: string) => (this.token = token));
    }
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
