import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JfRecordComponent } from './jf-record.component';

describe('JfRecordComponent', () => {
  let component: JfRecordComponent;
  let fixture: ComponentFixture<JfRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JfRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JfRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
