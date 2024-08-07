import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MepcoeventsComponent } from './mepcoevents.component';

describe('MepcoeventsComponent', () => {
  let component: MepcoeventsComponent;
  let fixture: ComponentFixture<MepcoeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MepcoeventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MepcoeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
