import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JfGainComponent } from './jf-gain.component';

describe('JfGainComponent', () => {
  let component: JfGainComponent;
  let fixture: ComponentFixture<JfGainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JfGainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JfGainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
