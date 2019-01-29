import { Injectable, EventEmitter } from "@angular/core";
import { Product } from "../model/poduct.model";
import { DataStorageService } from "./data-storage.service";
import { NGXLogger } from "ngx-logger";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  productInCarts = new EventEmitter<Product[]>();
  cartItemsChanged = new EventEmitter<Product[]>();
  private products: Product[];
  private selectedProducts: Product[];

  constructor(private dataService: DataStorageService, private logger: NGXLogger) {}

  public getProducts() {
    this.logger.info("getProducts entry");
    if (!this.products) {
      this.products = [];
      this.logger.info("subscribe to cart products");
      this.dataService.getCartProducts().subscribe(
        (data: Product[]) => {
        this.logger.debug("cart products fetched from data service " + data);
        data.forEach(x => {
          this.products.push(Object.assign(new Product(), x));
        });
        this.productInCarts.emit(this.products.slice());
      },
      (error) => alert("Please check your internet connection ")
      );
    }
    this.logger.info("getProducts exit");
    return this.products.slice();
  }

  public getSelectedProducts() {
    this.logger.info("getSelectedProducts entry");
    if (!this.selectedProducts) {
      this.selectedProducts = [];
      this.dataService.getSelectedProducts().subscribe((data: Product[]) => {
        if (data) {
          this.logger.debug("fetched selected products from data service " + data);
          data.forEach(x => {
            this.selectedProducts.push(Object.assign(new Product(), x));
          });
        }
        this.cartItemsChanged.emit(this.selectedProducts.slice());
      });
    }
    this.logger.info("getSelectedProducts exit");
    return this.selectedProducts.slice();
  }

  public addToCart(product: Product) {
    if (!this.selectedProducts) {
      this.selectedProducts = [];
    }
    const foundIndex = this.findProductIndex(product);
    if (foundIndex == -1) {
      this.selectedProducts.push(product);
    } else {
      this.selectedProducts[foundIndex].incrementQuantity();
    }

    this.dataService
      .addProductsToCart(this.selectedProducts)
      .subscribe();
    this.cartItemsChanged.emit(this.selectedProducts.slice());
  }
  public incrProductInCart(product: Product) {
    this.logger.info('incrProductInCart');
    const foundIndex = this.findProductIndex(product);
    this.selectedProducts[foundIndex].incrementQuantity();
    this.updateCartItems();
  }

  public decrProductInCart(product: Product) {
    this.logger.info('decrProductInCart');
    const foundIndex = this.findProductIndex(product);
    if (this.selectedProducts[foundIndex].getQuantity() === 1) {
      this.logger.debug('remove product from cart');
      this.selectedProducts = this.selectedProducts.filter(
        x => x.getId() !== product.getId()
      );
    } else {
      this.selectedProducts[foundIndex].decrementQuantity();
    }
    this.updateCartItems();
  }

  public clearCart() {
    this.logger.debug('clear cart');
    this.selectedProducts = [];
    this.updateCartItems();
  }

  private findProductIndex(product: Product) {
    return this.selectedProducts.findIndex(x => x.getId() === product.getId());
  }

  private updateCartItems() {
    this.dataService
      .addProductsToCart(this.selectedProducts)
      .subscribe();
    this.cartItemsChanged.emit(this.selectedProducts.slice());
  }
}
