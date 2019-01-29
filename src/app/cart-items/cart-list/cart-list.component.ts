import { Component, OnInit, Input } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/model/poduct.model";

@Component({
  selector: "app-cart-list",
  templateUrl: "./cart-list.component.html",
  styleUrls: []
})
export class CartListComponent implements OnInit {
  @Input() tabletMode: string;
  selectedProducts: Product[];
  totalPrice: number;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.selectedProducts = this.productService.getSelectedProducts();
    this.productService.cartItemsChanged.subscribe((selProducts: Product[]) => {
      this.selectedProducts = selProducts;
      const reducer = (acc: number, p: Product) =>
        acc + p.getQuantity() * p.getPrice();
      this.totalPrice = selProducts.reduce(reducer, 0);
    });
  }

  clearCart() {
    this.productService.clearCart();
    this.totalPrice = 0;
  }
}
