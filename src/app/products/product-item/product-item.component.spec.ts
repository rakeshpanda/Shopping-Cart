import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductItemComponent } from "./product-item.component";
import { ProductService } from "src/app/services/product.service";
import { ProductServiceMock } from "src/app/services/product.service.mock";
import { ProductList } from "src/app/services/data-storage.service.mock";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("ProductItemComponent", () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;
  let de: DebugElement;
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductItemComponent],
      imports: [],
      providers: [{ provide: ProductService, useClass: ProductServiceMock }]
    });
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    component.product = ProductList[0];
    service = TestBed.get(ProductService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have a image ", () => {
    const img = de.query(By.css("img"));
    expect(img.nativeElement.src).toBe(ProductList[0].getImagePath());
  });

  it("should have product name  ", () => {
    const h2 = de.nativeElement.querySelectorAll("h2");
    expect(h2[0].textContent).toBe(ProductList[0].getName());
  });

  it("should have product price  ", () => {
    const h2 = de.nativeElement.querySelectorAll("h2");
    expect(h2[1].textContent).toBe(ProductList[0].getPrice() + " Kr");
  });
});
