import * as faker from "faker";
import { Product } from "../model/poduct.model";
import { from } from "rxjs";

export let ProductList: Product[];
export let SelProductList: Product[];

ProductList = [];
for (let i = 0; i < 2; i++) {
  ProductList.push(
    Object.assign(new Product(), {
      id: faker.random.number(),
      name: faker.commerce.productName(),
      quantity: 1,
      imagePath: faker.image.imageUrl(),
      price: faker.random.number()
    })
  );
}

export class DataStorageServiceMock {
  constructor() {}

  public getCartProducts() {}

  public getSelectedProducts() {}

  public addProductsToCart(products: Product[]) {}
}
