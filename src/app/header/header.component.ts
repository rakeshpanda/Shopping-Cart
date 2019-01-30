import { Component, OnInit, HostListener } from "@angular/core";
import { Product } from "src/app/model/poduct.model";
import { ProductService } from "src/app/services/product.service";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  cartProducts: Product[];
  totalCartItems: number;
  tabletMode: string;
  hideCart = true;
  @HostListener("window:resize", ["$event"])
  onResize() {
    this.setTabletMode();
  }
  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit() {
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
