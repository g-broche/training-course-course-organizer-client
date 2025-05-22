import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefDetailsComponent } from './details.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { BriefService } from '../../../services/brief.service';
import { Student } from '../../../../types/types';

const mockBrief = {
  id: 1,
  name: "brief Angular",
  content: "this brief sample data because we have no backend to work with",
  createdAt: 1747353038,
  editedAt: null,
  status: "ongoing",
  authorId: 1
};

const mockBriefService = {
  retrieveBriefById: jasmine.createSpy('retrieveBriefById').and.returnValue(of(mockBrief))
};

const mockActivatedRoute = {
  paramMap: of(convertToParamMap({ id: '4' }))
};

const dwwmStudents: Student[] = [
  {
    "id": 1,
    "firstName": "Betty",
    "lastName": "Atkinson",
    "birthdate": "18/09/1995",
    "genre": "male",
    "email": "student1@student.test",
    "isVerified": true,
    "hasAcceptedTerms": true,
    "hasAcceptedCookies": true,
    "answeredTermsAt": 1747399590,
    "createdBy": 1,
    "createdAt": 1747399590,
    "editedAt": null,
    "roles": [
      "user",
      "student"
    ],
    "degrees": [
      "DWWM"
    ],
    "promos": [
      {
        "id": 1,
        "name": "CDA Java",
        "description": "La CDA Java/Angular",
        "degree": {
          "id": 2,
          "label": "CDA"
        },
        "startDate": "24/03/2025",
        "endDate": "21/03/2026",
        "createdBy": 1,
        "createdAt": 1747109090,
        "editedAt": null,
        "status": "ongoing"
      }
    ],
    "skills": [
      {
        "id": 5,
        "promo": 1,
        "label": "SQL",
        "isHardSkill": true,
        "level": 1
      },
      {
        "id": 2,
        "promo": 1,
        "label": "french",
        "isHardSkill": true,
        "level": 1
      },
      {
        "id": 4,
        "promo": 1,
        "label": "create dynamic applications",
        "isHardSkill": true,
        "level": 3
      },
      {
        "id": 10,
        "promo": 1,
        "label": "Java",
        "isHardSkill": true,
        "level": 0
      },
      {
        "id": 8,
        "promo": 1,
        "label": "logic",
        "isHardSkill": false,
        "level": 0
      },
      {
        "id": 7,
        "promo": 1,
        "label": "curious",
        "isHardSkill": false,
        "level": 3
      },
      {
        "id": 1,
        "promo": 1,
        "label": "confidence",
        "isHardSkill": false,
        "level": 3
      }
    ]
  },
  {
    "id": 2,
    "firstName": "Brandon",
    "lastName": "Villanueva",
    "birthdate": "04/01/2004",
    "genre": "neutral",
    "email": "student2@student.test",
    "isVerified": true,
    "hasAcceptedTerms": true,
    "hasAcceptedCookies": true,
    "answeredTermsAt": 1747399590,
    "createdBy": 1,
    "createdAt": 1747399590,
    "editedAt": null,
    "roles": [
      "user",
      "student"
    ],
    "degrees": [
      "DWWM"
    ],
    "promos": [
      {
        "id": 2,
        "name": "CDA PHP",
        "description": "La CDA PHP/React",
        "degree": {
          "id": 2,
          "label": "CDA"
        },
        "startDate": "24/03/2025",
        "endDate": "21/03/2026",
        "createdBy": 1,
        "createdAt": 1747109090,
        "editedAt": null,
        "status": "ongoing"
      }
    ],
    "skills": [
      {
        "id": 6,
        "promo": 2,
        "label": "MongoDB",
        "isHardSkill": true,
        "level": 3
      },
      {
        "id": 4,
        "promo": 2,
        "label": "create dynamic applications",
        "isHardSkill": true,
        "level": 0
      },
      {
        "id": 3,
        "promo": 2,
        "label": "create static applications",
        "isHardSkill": true,
        "level": 3
      },
      {
        "id": 8,
        "promo": 2,
        "label": "logic",
        "isHardSkill": false,
        "level": 0
      }
    ]
  },
  {
    "id": 3,
    "firstName": "Melanie",
    "lastName": "Bass",
    "birthdate": "04/05/2003",
    "genre": "neutral",
    "email": "student3@student.test",
    "isVerified": true,
    "hasAcceptedTerms": true,
    "hasAcceptedCookies": true,
    "answeredTermsAt": 1747399590,
    "createdBy": 1,
    "createdAt": 1747399590,
    "editedAt": null,
    "roles": [
      "user",
      "student"
    ],
    "degrees": [
      "DWWM"
    ],
    "promos": [
      {
        "id": 1,
        "name": "CDA Java",
        "description": "La CDA Java/Angular",
        "degree": {
          "id": 2,
          "label": "CDA"
        },
        "startDate": "24/03/2025",
        "endDate": "21/03/2026",
        "createdBy": 1,
        "createdAt": 1747109090,
        "editedAt": null,
        "status": "ongoing"
      }
    ],
    "skills": [
      {
        "id": 6,
        "promo": 1,
        "label": "MongoDB",
        "isHardSkill": true,
        "level": 2
      },
      {
        "id": 5,
        "promo": 1,
        "label": "SQL",
        "isHardSkill": true,
        "level": 0
      },
      {
        "id": 10,
        "promo": 1,
        "label": "Java",
        "isHardSkill": true,
        "level": 3
      },
      {
        "id": 4,
        "promo": 1,
        "label": "create dynamic applications",
        "isHardSkill": true,
        "level": 3
      }
    ]
  },
  {
    "id": 4,
    "firstName": "Rebecca",
    "lastName": "Erickson",
    "birthdate": "19/06/1992",
    "genre": "neutral",
    "email": "student4@student.test",
    "isVerified": true,
    "hasAcceptedTerms": true,
    "hasAcceptedCookies": true,
    "answeredTermsAt": 1747399590,
    "createdBy": 1,
    "createdAt": 1747399590,
    "editedAt": null,
    "roles": [
      "user",
      "student"
    ],
    "degrees": [
      "DWWM"
    ],
    "promos": [
      {
        "id": 2,
        "name": "CDA PHP",
        "description": "La CDA PHP/React",
        "degree": {
          "id": 2,
          "label": "CDA"
        },
        "startDate": "24/03/2025",
        "endDate": "21/03/2026",
        "createdBy": 1,
        "createdAt": 1747109090,
        "editedAt": null,
        "status": "ongoing"
      }
    ],
    "skills": [
      {
        "id": 1,
        "promo": 2,
        "label": "confidence",
        "isHardSkill": false,
        "level": 0
      },
      {
        "id": 8,
        "promo": 2,
        "label": "logic",
        "isHardSkill": false,
        "level": 3
      },
      {
        "id": 3,
        "promo": 2,
        "label": "create static applications",
        "isHardSkill": true,
        "level": 4
      },
      {
        "id": 4,
        "promo": 2,
        "label": "create dynamic applications",
        "isHardSkill": true,
        "level": 0
      },
      {
        "id": 7,
        "promo": 2,
        "label": "curious",
        "isHardSkill": false,
        "level": 4
      }
    ]
  },
  {
    "id": 5,
    "firstName": "Jeremy",
    "lastName": "Myers",
    "birthdate": "04/09/1987",
    "genre": "neutral",
    "email": "student5@student.test",
    "isVerified": true,
    "hasAcceptedTerms": true,
    "hasAcceptedCookies": true,
    "answeredTermsAt": 1747399590,
    "createdBy": 1,
    "createdAt": 1747399590,
    "editedAt": null,
    "roles": [
      "user",
      "student"
    ],
    "degrees": [
      "DWWM"
    ],
    "promos": [
      {
        "id": 1,
        "name": "CDA Java",
        "description": "La CDA Java/Angular",
        "degree": {
          "id": 2,
          "label": "CDA"
        },
        "startDate": "24/03/2025",
        "endDate": "21/03/2026",
        "createdBy": 1,
        "createdAt": 1747109090,
        "editedAt": null,
        "status": "ongoing"
      }
    ],
    "skills": [
      {
        "id": 8,
        "promo": 1,
        "label": "logic",
        "isHardSkill": false,
        "level": 2
      },
      {
        "id": 2,
        "promo": 1,
        "label": "french",
        "isHardSkill": true,
        "level": 3
      },
      {
        "id": 10,
        "promo": 1,
        "label": "Java",
        "isHardSkill": true,
        "level": 3
      },
      {
        "id": 7,
        "promo": 1,
        "label": "curious",
        "isHardSkill": false,
        "level": 3
      }
    ]
  }
]
const nondwwmStudents: Student[] = [
  {
    "id": 6,
    "firstName": "Grace",
    "lastName": "Martinez",
    "birthdate": "05/04/2001",
    "genre": "neutral",
    "email": "student6@student.test",
    "isVerified": true,
    "hasAcceptedTerms": true,
    "hasAcceptedCookies": true,
    "answeredTermsAt": 1747399590,
    "createdBy": 1,
    "createdAt": 1747399590,
    "editedAt": null,
    "roles": [
      "user",
      "student"
    ],
    "degrees": [],
    "promos": [
      {
        "id": 2,
        "name": "CDA PHP",
        "description": "La CDA PHP/React",
        "degree": {
          "id": 2,
          "label": "CDA"
        },
        "startDate": "24/03/2025",
        "endDate": "21/03/2026",
        "createdBy": 1,
        "createdAt": 1747109090,
        "editedAt": null,
        "status": "ongoing"
      }
    ],
    "skills": [
      {
        "id": 1,
        "promo": 2,
        "label": "confidence",
        "isHardSkill": false,
        "level": 4
      },
      {
        "id": 5,
        "promo": 2,
        "label": "SQL",
        "isHardSkill": true,
        "level": 1
      },
      {
        "id": 6,
        "promo": 2,
        "label": "MongoDB",
        "isHardSkill": true,
        "level": 3
      },
      {
        "id": 7,
        "promo": 2,
        "label": "curious",
        "isHardSkill": false,
        "level": 4
      },
      {
        "id": 4,
        "promo": 2,
        "label": "create dynamic applications",
        "isHardSkill": true,
        "level": 2
      },
      {
        "id": 3,
        "promo": 2,
        "label": "create static applications",
        "isHardSkill": true,
        "level": 2
      },
      {
        "id": 10,
        "promo": 2,
        "label": "Java",
        "isHardSkill": true,
        "level": 1
      }
    ]
  },
  {
    "id": 7,
    "firstName": "Robert",
    "lastName": "Allen",
    "birthdate": "24/08/1986",
    "genre": "male",
    "email": "student7@student.test",
    "isVerified": true,
    "hasAcceptedTerms": true,
    "hasAcceptedCookies": true,
    "answeredTermsAt": 1747399590,
    "createdBy": 1,
    "createdAt": 1747399590,
    "editedAt": null,
    "roles": [
      "user",
      "student"
    ],
    "degrees": [],
    "promos": [
      {
        "id": 1,
        "name": "CDA Java",
        "description": "La CDA Java/Angular",
        "degree": {
          "id": 2,
          "label": "CDA"
        },
        "startDate": "24/03/2025",
        "endDate": "21/03/2026",
        "createdBy": 1,
        "createdAt": 1747109090,
        "editedAt": null,
        "status": "ongoing"
      }
    ],
    "skills": [
      {
        "id": 8,
        "promo": 1,
        "label": "logic",
        "isHardSkill": false,
        "level": 1
      },
      {
        "id": 6,
        "promo": 1,
        "label": "MongoDB",
        "isHardSkill": true,
        "level": 4
      },
      {
        "id": 2,
        "promo": 1,
        "label": "french",
        "isHardSkill": true,
        "level": 0
      },
      {
        "id": 7,
        "promo": 1,
        "label": "curious",
        "isHardSkill": false,
        "level": 4
      }
    ]
  },
  {
    "id": 8,
    "firstName": "Tonya",
    "lastName": "Patton",
    "birthdate": "09/09/1988",
    "genre": "neutral",
    "email": "student8@student.test",
    "isVerified": true,
    "hasAcceptedTerms": true,
    "hasAcceptedCookies": true,
    "answeredTermsAt": 1747399590,
    "createdBy": 1,
    "createdAt": 1747399590,
    "editedAt": null,
    "roles": [
      "user",
      "student"
    ],
    "degrees": [],
    "promos": [
      {
        "id": 2,
        "name": "CDA PHP",
        "description": "La CDA PHP/React",
        "degree": {
          "id": 2,
          "label": "CDA"
        },
        "startDate": "24/03/2025",
        "endDate": "21/03/2026",
        "createdBy": 1,
        "createdAt": 1747109090,
        "editedAt": null,
        "status": "ongoing"
      }
    ],
    "skills": [
      {
        "id": 7,
        "promo": 2,
        "label": "curious",
        "isHardSkill": false,
        "level": 2
      },
      {
        "id": 9,
        "promo": 2,
        "label": "Angular",
        "isHardSkill": true,
        "level": 3
      },
      {
        "id": 6,
        "promo": 2,
        "label": "MongoDB",
        "isHardSkill": true,
        "level": 0
      },
      {
        "id": 3,
        "promo": 2,
        "label": "create static applications",
        "isHardSkill": true,
        "level": 0
      },
      {
        "id": 10,
        "promo": 2,
        "label": "Java",
        "isHardSkill": true,
        "level": 2
      },
      {
        "id": 4,
        "promo": 2,
        "label": "create dynamic applications",
        "isHardSkill": true,
        "level": 1
      }
    ]
  },
  {
    "id": 9,
    "firstName": "Katherine",
    "lastName": "Carpenter",
    "birthdate": "25/12/1995",
    "genre": "neutral",
    "email": "student9@student.test",
    "isVerified": true,
    "hasAcceptedTerms": true,
    "hasAcceptedCookies": true,
    "answeredTermsAt": 1747399590,
    "createdBy": 1,
    "createdAt": 1747399590,
    "editedAt": null,
    "roles": [
      "user",
      "student"
    ],
    "degrees": [],
    "promos": [
      {
        "id": 1,
        "name": "CDA Java",
        "description": "La CDA Java/Angular",
        "degree": {
          "id": 2,
          "label": "CDA"
        },
        "startDate": "24/03/2025",
        "endDate": "21/03/2026",
        "createdBy": 1,
        "createdAt": 1747109090,
        "editedAt": null,
        "status": "ongoing"
      }
    ],
    "skills": [
      {
        "id": 4,
        "promo": 1,
        "label": "create dynamic applications",
        "isHardSkill": true,
        "level": 1
      },
      {
        "id": 5,
        "promo": 1,
        "label": "SQL",
        "isHardSkill": true,
        "level": 4
      },
      {
        "id": 3,
        "promo": 1,
        "label": "create static applications",
        "isHardSkill": true,
        "level": 1
      },
      {
        "id": 10,
        "promo": 1,
        "label": "Java",
        "isHardSkill": true,
        "level": 1
      },
      {
        "id": 7,
        "promo": 1,
        "label": "curious",
        "isHardSkill": false,
        "level": 3
      },
      {
        "id": 8,
        "promo": 1,
        "label": "logic",
        "isHardSkill": false,
        "level": 0
      },
      {
        "id": 6,
        "promo": 1,
        "label": "MongoDB",
        "isHardSkill": true,
        "level": 3
      }
    ]
  },
  {
    "id": 10,
    "firstName": "Jamie",
    "lastName": "Richardson",
    "birthdate": "29/03/2004",
    "genre": "neutral",
    "email": "student10@student.test",
    "isVerified": true,
    "hasAcceptedTerms": true,
    "hasAcceptedCookies": true,
    "answeredTermsAt": 1747399590,
    "createdBy": 1,
    "createdAt": 1747399590,
    "editedAt": null,
    "roles": [
      "user",
      "student"
    ],
    "degrees": [],
    "promos": [
      {
        "id": 2,
        "name": "CDA PHP",
        "description": "La CDA PHP/React",
        "degree": {
          "id": 2,
          "label": "CDA"
        },
        "startDate": "24/03/2025",
        "endDate": "21/03/2026",
        "createdBy": 1,
        "createdAt": 1747109090,
        "editedAt": null,
        "status": "ongoing"
      }
    ],
    "skills": [
      {
        "id": 1,
        "promo": 2,
        "label": "confidence",
        "isHardSkill": false,
        "level": 4
      },
      {
        "id": 3,
        "promo": 2,
        "label": "create static applications",
        "isHardSkill": true,
        "level": 0
      },
      {
        "id": 6,
        "promo": 2,
        "label": "MongoDB",
        "isHardSkill": true,
        "level": 4
      },
      {
        "id": 10,
        "promo": 2,
        "label": "Java",
        "isHardSkill": true,
        "level": 0
      }
    ]
  },
]

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

  it("countNecessaryGroups - given 10 people and 3 per group should return 4", () => {
    const studentAmount = 10;
    const studentsPerGroup = 3

    const groupAmount = component.countNecessaryGroups(studentAmount, studentsPerGroup)
    expect(groupAmount).toBe(4)
  })

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

  it('hasStudentDoneDWWM - given student without DWWM should return false', () => {
    const nonDwwmStudent = nondwwmStudents[0]
    const hasDWWM = component.hasStudentDoneDWWM(nonDwwmStudent);
    expect(hasDWWM).toBe(false)
  })

  it('hasStudentDoneDWWM - given student with DWWM should return true', () => {
    const dwwmStudent = dwwmStudents[0]
    const hasDWWM = component.hasStudentDoneDWWM(dwwmStudent);
    expect(hasDWWM).toBe(true)
  })

  it('allocateGroupMembersRandomly - assign all provided students', () => {
    const students = [...dwwmStudents, ...nondwwmStudents];
    const studentIds = new Set(Array.from(students.map(student => student.id)))
    const wasSetFilledInitially = studentIds.size > 0
    const amountPerGroup = 3;

    const groupAmountRequired = component.countNecessaryGroups(students.length, amountPerGroup)
    component.createRequiredGroups(groupAmountRequired)
    component.allocateGroupMembersRandomly(students, amountPerGroup);
    const createdGroups = component.groups;
    for (const group of createdGroups) {
      for (const member of group.members) {
        studentIds.delete(member.id)
      }
    }

    expect(wasSetFilledInitially).toBe(true);
    expect(studentIds.size).toBe(0);
  })

  it('allocateGroupMembersRandomlyWhileBalancingDWWM - assign all provided students', () => {
    const students = [...dwwmStudents, ...nondwwmStudents];
    const studentIds = new Set(Array.from(students.map(student => student.id)))
    const wasSetFilledInitially = studentIds.size > 0
    const amountPerGroup = 3;

    const groupAmountRequired = component.countNecessaryGroups(students.length, amountPerGroup)
    component.createRequiredGroups(groupAmountRequired)
    component.allocateGroupMembersRandomlyWhileBalancingDWWM(students, amountPerGroup);
    const createdGroups = component.groups;
    for (const group of createdGroups) {
      for (const member of group.members) {
        studentIds.delete(member.id)
      }
    }

    expect(wasSetFilledInitially).toBe(true);
    expect(studentIds.size).toBe(0);
  })

  it("allocateGroupMembersRandomlyWhileBalancingDWWM - given 5 DWWM and 5 non DWWM should create 5 mixed pairs", () => {
    const students = [...dwwmStudents, ...nondwwmStudents];
    const amountPerGroup = 2;

    const groupAmountRequired = component.countNecessaryGroups(students.length, amountPerGroup)
    component.createRequiredGroups(groupAmountRequired)
    component.allocateGroupMembersRandomlyWhileBalancingDWWM(students, amountPerGroup);
    const createdGroups = component.groups;
    let resultArrayMixed = [];
    let resultArrayPairs = [];
    for (const group of createdGroups) {
      const groupContainsDwwm = group.members.some(it => it.degrees.includes("DWWM"))
      const groupContainsNonDwwm = group.members.some(it => !it.degrees.includes("DWWM"))
      const isGroupBalanced = groupContainsDwwm && groupContainsNonDwwm
      resultArrayMixed.push(isGroupBalanced);
      resultArrayPairs.push(group.members.length === 2);
    }
    const groupAmountCreated = component.groups.length
    const areAllGroupsPairs = resultArrayPairs.every(it => it === true)
    const areAllGroupsBalanced = resultArrayMixed.every(it => it === true)
    expect(groupAmountCreated).withContext("There should be 5 groups").toBe(5);
    expect(areAllGroupsPairs).withContext("All groups should be pairs").toBe(true);
    expect(areAllGroupsBalanced).withContext("All groups should be mixed DWWM and non DWWM").toBe(true);
  })
});
