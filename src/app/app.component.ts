import { Component, OnInit, HostListener } from "@angular/core";
import { ProductService } from "./services/product.service";
import { Product } from "./model/poduct.model";
import * as firebase from "firebase/app";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  cartProducts: Product[];
  totalCartItems: number;
  tabletMode: string;
  hideCart = true;
  @HostListener("window:resize", ["$event"])
  onResize() {
    this.setTabletMode();
  }
  constructor(private productService: ProductService) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCfl67uB3OERPbSU3Gc4djB4aVauelonsM",
      authDomain: "shopping-cart-f231e.firebaseapp.com"
    });
    this.setTabletMode();
    this.productService.cartItemsChanged$.subscribe((products: Product[]) => {
      const reducer = (acc: number, p: Product) => acc + p.getQuantity();
      this.totalCartItems = products.reduce(reducer, 0);
    });
  }

  toggleCollapseCart() {
    this.hideCart = !this.hideCart;
  }

  setTabletMode() {
    if (window.innerWidth < 768) {
      this.tabletMode = "MOBILE";
    } else if (window.innerWidth < 992) {
      this.tabletMode = "TABLET";
    } else {
      this.tabletMode = "DESKTOP";
    }
  }
}
