import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefIndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: BriefIndexComponent;
  let fixture: ComponentFixture<BriefIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BriefIndexComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BriefIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
