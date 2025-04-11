import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightforecastComponent } from './rightforecast.component';

describe('RightforecastComponent', () => {
  let component: RightforecastComponent;
  let fixture: ComponentFixture<RightforecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightforecastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightforecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
