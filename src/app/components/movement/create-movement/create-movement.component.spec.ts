import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMovementComponent } from './create-movement.component';

describe('CreateMovementComponent', () => {
  let component: CreateMovementComponent;
  let fixture: ComponentFixture<CreateMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
