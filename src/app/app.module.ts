import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { ProductListComponent } from "./products/product-list/product-list.component";
import { ProductItemComponent } from "./products/product-item/product-item.component";
import { CartListComponent } from "./cart-items/cart-list/cart-list.component";
import { CartItemComponent } from "./cart-items/cart-item/cart-item.component";
import { HttpClientModule } from "@angular/common/http";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { FormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from './auth/auth-guard.service';
import { ModalComponent } from './modal/modal.component';

export const appRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "shopping-list", component: HeaderComponent , canActivate: [AuthGuard]  },
  { path: "**", redirectTo: "/login" },
  { path: "", redirectTo: '/login', pathMatch: 'full' }
  
  
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductItemComponent,
    CartListComponent,
    CartItemComponent,
    LoginComponent,
    HeaderComponent,
    SignupComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoggerModule.forRoot({ level: NgxLoggerLevel.INFO }),
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
