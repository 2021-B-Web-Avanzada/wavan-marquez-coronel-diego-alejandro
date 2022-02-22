import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductRouteComponent } from './create-product-route.component';

describe('CreateProductRouteComponent', () => {
  let component: CreateProductRouteComponent;
  let fixture: ComponentFixture<CreateProductRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
