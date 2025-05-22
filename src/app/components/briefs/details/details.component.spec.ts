import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefDetailsComponent } from './details.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { BriefService } from '../../../services/brief.service';

const mockBrief = {
  id: 4,
  name: 'brief 4',
  content: 'Angular',
  createdAt: 1747353038,
  editedAt: null,
  status: 'ongoing',
  authorId: 1
};

const mockBriefService = {
  retrieveBriefById: jasmine.createSpy('retrieveBriefById').and.returnValue(of(mockBrief))
};

const mockActivatedRoute = {
  paramMap: of(convertToParamMap({ id: '4' }))
};

describe('BriefDetailsComponent', () => {
  let component: BriefDetailsComponent;
  let fixture: ComponentFixture<BriefDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BriefDetailsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: BriefService, useValue: mockBriefService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BriefDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('createRequiredGroups - should create groups with expected name format', () => {
    const amount = 3;

    component.createRequiredGroups(amount);

    expect(component.groups[0].name).toBe('Group 1');
    expect(component.groups[1].name).toBe('Group 2');
    expect(component.groups[2].name).toBe('Group 3');
  })

  it('createRequiredGroups - should create groups with empty member array', () => {
    const amount = 3;

    component.createRequiredGroups(amount);

    component.groups.forEach(group => {
      expect(group.members).toEqual([]);
    });
  })

  it('createRequiredGroups should create expected amount of groups', () => {
    const amount = 3;

    component.createRequiredGroups(amount);

    expect(component.groups.length).toBe(amount);
  })
});
