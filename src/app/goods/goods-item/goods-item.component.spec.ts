import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsItemComponent } from './goods-item.component';

describe('GoodsItemComponent', () => {
  let component: GoodsItemComponent;
  let fixture: ComponentFixture<GoodsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
