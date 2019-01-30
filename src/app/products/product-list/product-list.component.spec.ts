import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";

import { ProductListComponent } from "./product-list.component";
import { ProductService } from "src/app/services/product.service";
import { ProductList } from "src/app/services/data-storage.service.mock";
import { ProductItemComponent } from "../product-item/product-item.component";
import { ProductServiceMock } from "src/app/services/product.service.mock";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("ProductListComponent", () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let de: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent, ProductItemComponent],
      imports: [],
      providers: [{ provide: ProductService, useClass: ProductServiceMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(`should have list of products'`, () => {
    expect(JSON.stringify(component.products)).toEqual(
      JSON.stringify(ProductList)
    );
  });

  it(`should have header products defined'`, () => {
    const h2 = de.query(By.css("h2"));
    expect(h2.nativeElement.textContent).toBe("Products");
  });
});
