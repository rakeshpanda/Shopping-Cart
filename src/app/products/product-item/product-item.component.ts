import { Component, OnInit, Input } from "@angular/core";
import { Product } from "src/app/model/poduct.model";
import { ProductService } from "../../services/product.service";

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html"
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  constructor(private productService: ProductService) {}

  ngOnInit() {}

  onSelected() {
    this.productService.addToCart(this.product);
  }

  errorOnLoad(imageRef: HTMLImageElement) {
    const fallBackPath = "assets/img/products/no_image_small.svg";
    imageRef.setAttribute("src", fallBackPath);
  }
}
