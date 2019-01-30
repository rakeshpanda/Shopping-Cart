import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { ModalComponent } from "src/app/modal/modal.component";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}
  @ViewChild(ModalComponent) modal: ModalComponent;

  ngOnInit() {
    this.authService.showDialog$.subscribe((modalText:string)=>{
      this.modal.visible = true;
      this.modal.visibleAnimate = true;
      this.modal.messageText = modalText;
    });
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
  }
}
