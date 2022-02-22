import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductRouteComponent } from './update-product-route.component';

describe('UpdateProductRouteComponent', () => {
  let component: UpdateProductRouteComponent;
  let fixture: ComponentFixture<UpdateProductRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProductRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
