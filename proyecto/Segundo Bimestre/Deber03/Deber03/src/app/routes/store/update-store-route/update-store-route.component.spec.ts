import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStoreRouteComponent } from './update-store-route.component';

describe('UpdateStoreRouteComponent', () => {
  let component: UpdateStoreRouteComponent;
  let fixture: ComponentFixture<UpdateStoreRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStoreRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStoreRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
