import { Injectable, EventEmitter } from "@angular/core";
import { Product } from "../model/poduct.model";
import { DataStorageService } from "./data-storage.service";
import { NGXLogger } from "ngx-logger";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  productInCarts$ = new EventEmitter<Product[]>();
  cartItemsChanged$ = new EventEmitter<Product[]>();
  private products: Product[];
  private selectedProducts: Product[];

  constructor(
    private dataService: DataStorageService,
    private logger: NGXLogger,
    private authService: AuthService
  ) {}

  public getProducts() {
    this.logger.info("getProducts entry");
    if (!this.products) {
      this.products = [];
      this.logger.info("subscribe to cart products");
      this.dataService.getCartProducts().subscribe(
        (data: Product[]) => {
          data.forEach(x => {
            this.products.push(Object.assign(new Product(), x));
          });
          this.logger.debug(
            "cart products fetched from data service " +
              JSON.stringify(this.products)
          );
          this.productInCarts$.emit(this.products.slice());
        },

        error => alert("Please check your internet connection ")
      );
    }
    this.logger.info("getProducts exit");
    return this.products.slice();
  }

  public getSelectedProducts() {
    this.logger.info("getSelectedProducts entry");
    this.selectedProducts = [];
    if (this.authService.uid) {
      this.dataService.getSelectedProducts().subscribe((data: Product[]) => {
        if (data) {
          data.forEach(x => {
            this.selectedProducts.push(Object.assign(new Product(), x));
          });
          this.logger.debug(
            "fetched selected products from data service " +
              JSON.stringify(this.selectedProducts)
          );
          this.cartItemsChanged$.emit(this.selectedProducts.slice());
        }
      });
    } else {
      (JSON.parse(localStorage.getItem("cart")) || []).forEach((x: Product) =>
        this.selectedProducts.push(Object.assign(new Product(), x))
      );
    }
    this.logger.info("getSelectedProducts exit");
    return this.selectedProducts.slice();
  }

  public addToCart(product: Product) {
    const foundIndex = this.findProductIndex(product);
    if (foundIndex == -1) {
      this.selectedProducts.push(product);
    } else {
      this.selectedProducts[foundIndex].incrementQuantity();
    }
    this.updateCartItems();
  }
  public incrProductInCart(product: Product) {
    this.logger.info("incrProductInCart");
    const foundIndex = this.findProductIndex(product);
    this.selectedProducts[foundIndex].incrementQuantity();
    this.updateCartItems();
  }

  public decrProductInCart(product: Product) {
    this.logger.info("decrProductInCart");
    const foundIndex = this.findProductIndex(product);
    if (this.selectedProducts[foundIndex].getQuantity() === 1) {
      this.logger.info("removed product from cart");
      this.selectedProducts = this.selectedProducts.filter(
        x => x.getId() !== product.getId()
      );
    } else {
      this.selectedProducts[foundIndex].decrementQuantity();
    }
    this.updateCartItems();
  }

  public clearCart() {
    this.logger.debug("clear cart");
    this.selectedProducts = [];
    this.updateCartItems();
  }

  private findProductIndex(product: Product) {
    return this.selectedProducts.findIndex(x => x.getId() === product.getId());
  }

  private updateCartItems() {
    if (this.authService.uid) {
      this.logger.info("saving items to data service");
      this.dataService.addProductsToCart(this.selectedProducts).subscribe();
    } else {
      localStorage.setItem("cart", JSON.stringify(this.selectedProducts));
      this.logger.info("saving items to local storage cart");
    }
    this.cartItemsChanged$.emit(this.selectedProducts.slice());
  }

  logout() {
    this.logger.info("clear cart");
    this.authService.logout();
    this.clearCart();
  }
}
