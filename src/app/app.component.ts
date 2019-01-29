import { Component, OnInit, HostListener } from "@angular/core";
import { ProductService } from "./services/product.service";
import { Product } from "./model/poduct.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  cartProducts: Product[];
  totalCartItems: number;
  tabletMode: string;
  title = "shopping-app";
  hideCart = true;
  @HostListener("window:resize", ["$event"])
  onResize() {
    this.setTabletMode();
  }
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.setTabletMode();
    this.productService.cartItemsChanged.subscribe((products: Product[]) => {
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
