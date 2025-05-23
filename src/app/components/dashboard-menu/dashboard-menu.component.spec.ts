import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMenuComponent } from './dashboard-menu.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('DashboardMenuComponent', () => {
  let component: DashboardMenuComponent;
  let fixture: ComponentFixture<DashboardMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMenuComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
