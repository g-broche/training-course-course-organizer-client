import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefIndexComponent } from './index.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('IndexComponent', () => {
  let component: BriefIndexComponent;
  let fixture: ComponentFixture<BriefIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BriefIndexComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
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
