import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetialComponent } from './order-detial.component';

describe('OrderDetialComponent', () => {
  let component: OrderDetialComponent;
  let fixture: ComponentFixture<OrderDetialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
