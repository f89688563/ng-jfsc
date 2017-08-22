import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActRedComponent } from './act-red.component';

describe('ActRedComponent', () => {
  let component: ActRedComponent;
  let fixture: ComponentFixture<ActRedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActRedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
