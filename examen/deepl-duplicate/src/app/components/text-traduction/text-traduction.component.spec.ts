import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTraductionComponent } from './text-traduction.component';

describe('TextTraductionComponent', () => {
  let component: TextTraductionComponent;
  let fixture: ComponentFixture<TextTraductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextTraductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextTraductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
