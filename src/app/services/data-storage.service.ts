import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../model/poduct.model";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(private httpClient: HttpClient) {}

  getCartProducts() {
    return this.httpClient.get<Product[]>(
      "https://shopping-cart-f231e.firebaseio.com/cartProducts.json"
    );
  }

  addProductsToCart(products: Product[]) {
    return this.httpClient.put(
      "https://shopping-cart-f231e.firebaseio.com/selProducts.json",
      products
    );
  }

  getSelectedProducts() {
    return this.httpClient.get<Product[]>(
      "https://shopping-cart-f231e.firebaseio.com/selProducts.json"
    );
  }
}
