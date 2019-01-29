export class Product {
  private id: number;
  private name: string;
  private quantity: number;
  private imagePath: string;
  private price: number;
  private addToCartText = "Add to Cart";

  // constructor(
  //   id: number,
  //   name: string,
  //   quantity: number,
  //   imagePath: string,
  //   price: number
  // ) {
  //   this.id = id;
  //   this.name = name;
  //   this.imagePath = imagePath;
  //   this.price = price;
  //  this.quantity = quantity;
  // }

  toJSON = function() {
    return {
      id: this.id,
      name: this.name,
      imagePath: this.imagePath,
      price: this.price,
      quantity: this.quantity
    };
  };

  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getImagePath() {
    return this.imagePath;
  }
  getQuantity() {
    return this.quantity;
  }
  getPrice() {
    return this.price;
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity) {
      this.quantity--;
    }
  }
}
