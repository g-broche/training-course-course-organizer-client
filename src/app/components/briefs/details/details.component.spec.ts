import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefDetailsComponent } from './details.component';

describe('BriefDetailsComponent', () => {
  let component: BriefDetailsComponent;
  let fixture: ComponentFixture<BriefDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BriefDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BriefDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
