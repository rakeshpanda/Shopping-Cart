import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/model/poduct.model";
import { ProductService } from "../../services/product.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html"
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.productService.productInCarts.subscribe((cartProducts: Product[]) => {
      this.products = cartProducts;
    });
  }
}
