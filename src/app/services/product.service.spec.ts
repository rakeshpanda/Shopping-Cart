import { TestBed, fakeAsync, tick } from "@angular/core/testing";

import { ProductService } from "./product.service";
import { DataStorageService } from "./data-storage.service";
import {
  DataStorageServiceMock,
  ProductList
} from "./data-storage.service.mock";
import { of } from "rxjs";
import { LoggerTestingModule } from "ngx-logger";
import { AuthService } from "../auth/auth.service";
import { RouterTestingModule } from "@angular/router/testing";
import { appRoutes } from "../app.module";
import { LoginComponent } from "../auth/login/login.component";
import { HeaderComponent } from "../header/header.component";
import { SignupComponent } from "../auth/signup/signup.component";

describe("ProductService", () => {
  let service: ProductService;
  let dataStorageService: DataStorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoggerTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        ProductService,
        { provide: DataStorageService, useClass: DataStorageServiceMock },
        AuthService
      ]
    });
    service = TestBed.get(ProductService);
    dataStorageService = TestBed.get(DataStorageService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should retrieve the products list", fakeAsync(() => {
    spyOn(dataStorageService, "getCartProducts").and.returnValue(
      of(ProductList)
    );
    let response = service.getProducts();
    tick();
    expect(JSON.stringify(response)).toBe(JSON.stringify(ProductList));
  }));

  it("should have addToCart method working", fakeAsync(() => {
    spyOn(dataStorageService, "addProductsToCart").and.returnValue(
      of([ProductList[0]])
    );
    spyOn(dataStorageService, "getSelectedProducts").and.returnValue(
      of([ProductList[0]])
    );
    let response = service.getSelectedProducts();
    service.addToCart(ProductList[0]);
    response = service.getSelectedProducts();
    tick();
    expect(JSON.stringify(response)).toBe(JSON.stringify([ProductList[0]]));
  }));
});
