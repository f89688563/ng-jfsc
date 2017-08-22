import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JfPunchComponent } from './jf-punch.component';

describe('JfPunchComponent', () => {
  let component: JfPunchComponent;
  let fixture: ComponentFixture<JfPunchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JfPunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JfPunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
