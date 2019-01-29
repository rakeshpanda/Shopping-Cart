import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ProductListComponent } from "./products/product-list/product-list.component";
import { ProductItemComponent } from "./products/product-item/product-item.component";
import { CartListComponent } from "./cart-items/cart-list/cart-list.component";
import { CartItemComponent } from "./cart-items/cart-item/cart-item.component";
import { HttpClientModule } from "@angular/common/http";
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductItemComponent,
    CartListComponent,
    CartItemComponent
  ],
  imports: [BrowserModule, HttpClientModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG})],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
