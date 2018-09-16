import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventConstructorComponent } from './event-constructor.component';

describe('EventConstructorComponent', () => {
  let component: EventConstructorComponent;
  let fixture: ComponentFixture<EventConstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventConstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
