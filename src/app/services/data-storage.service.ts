import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../model/poduct.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getCartProducts() {
    return this.httpClient.get<Product[]>(
      "https://shopping-cart-f231e.firebaseio.com/cartProducts.json"
    );
  }

  addProductsToCart(products: Product[]) {
    const token = this.authService.getToken();
    const userid = this.authService.uid;
    return this.httpClient.put(
      `https://shopping-cart-f231e.firebaseio.com/users/${userid}/selProducts.json?auth=${token}`,
      products
    );
  }

  getSelectedProducts() {
    const token = this.authService.getToken();
    const userid = this.authService.uid;
    return this.httpClient.get<Product[]>(
      `https://shopping-cart-f231e.firebaseio.com/users/${userid}/selProducts.json?auth=${token}`
    );
  }
}
