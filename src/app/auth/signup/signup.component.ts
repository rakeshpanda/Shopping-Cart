import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";
import { ModalComponent } from "src/app/modal/modal.component";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService) {}
  
  @ViewChild(ModalComponent) modal: ModalComponent;

  ngOnInit() {
    this.authService.showDialog$.subscribe((modalText:string)=>{
      this.modal.visible = true;
      this.modal.visibleAnimate = true;
      this.modal.messageText = modalText;
    });
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password);
  }
}
