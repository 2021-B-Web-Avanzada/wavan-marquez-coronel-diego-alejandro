import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStoreRouteComponent } from './create-store-route.component';

describe('CreateStoreRouteComponent', () => {
  let component: CreateStoreRouteComponent;
  let fixture: ComponentFixture<CreateStoreRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStoreRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStoreRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
