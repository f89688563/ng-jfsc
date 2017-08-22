import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActRecordComponent } from './act-record.component';

describe('ActRecordComponent', () => {
  let component: ActRecordComponent;
  let fixture: ComponentFixture<ActRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
