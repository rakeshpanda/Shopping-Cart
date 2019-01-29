import { Component, OnInit, Input } from "@angular/core";
import { Product } from "src/app/model/poduct.model";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-cart-item",
  templateUrl: "./cart-item.component.html",
  styleUrls: []
})
export class CartItemComponent implements OnInit {
  @Input() product: Product;
  @Input() tabletMode: string;
  constructor(private productService: ProductService) {}

  ngOnInit() {}

  increment() {
    this.productService.incrProductInCart(this.product);
  }

  decrement() {
    this.productService.decrProductInCart(this.product);
  }

  errorOnLoad(imageRef: HTMLImageElement) {
    const fallBackPath = "assets/img/products/no_image_small.svg";
    imageRef.setAttribute("src", fallBackPath);
  }
}
