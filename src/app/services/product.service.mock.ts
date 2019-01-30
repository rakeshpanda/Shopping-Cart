import { ProductList } from "./data-storage.service.mock";
import { EventEmitter } from "@angular/core";
import { Product } from "../model/poduct.model";

export class ProductServiceMock {
  productInCarts = new EventEmitter<Product[]>();
  constructor() {}

  public getProducts() {
    return ProductList;
  }
}
