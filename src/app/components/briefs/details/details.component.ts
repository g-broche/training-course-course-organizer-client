import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map, Observable, take } from 'rxjs';
import { Brief, Student, User } from '../../../../types/types';
import { UserService } from '../../../services/user.service';
import { PromoService } from '../../../services/promo.service';
import { CommonModule } from '@angular/common';
import { BriefService } from '../../../services/brief.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class BriefDetailsComponent {
  form!: FormGroup;
  brief$ = new BehaviorSubject<Brief | null>(null);
  user$: Observable<User | null>;
  isUserTeacher$: Observable<boolean | null>;
  studentList$: Observable<Student[] | null>;
  assignedStudents: Map<number, Student> = new Map();
  groups: { name: string, members: Student[] }[] = [];

  get assignedStudentAmount(): number {
    return this.assignedStudents.size
  }

  constructor(
    private userService: UserService,
    private promoService: PromoService,
    private briefService: BriefService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.user$ = this.userService.user$;
    this.isUserTeacher$ = this.userService.isUserTeacher$;
    this.studentList$ = this.promoService.managedStudents$;
    this.route.paramMap.subscribe(params => {
      const briefId = Number(params.get('id'));
      this.briefService.retrieveBriefById(briefId).subscribe(brief => {
        this.brief$.next(brief);
      });
    });

    combineLatest([this.userService.isUserTeacher$, this.brief$])
      .pipe(
        filter(([isTeacher, brief]) => !!isTeacher && !!brief),
        take(1)
      )
      .subscribe(() => {
        this.generateForm();
      });
  }

  generateForm() {
    this.form = this.formBuilder.group({
      amountPerGroup: [
        1,
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(5)
        ]
        )
      ],
      password: ['', Validators.required],
      mixDwwm: [false],
      mixAges: [false],
    });
  }

  private updateAmountValidator() {
    const amountControl = this.form.get('amountPerGroup');
    if (!amountControl) return;

    const maxAmount = this.assignedStudentAmount;
    amountControl.setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(maxAmount)
    ]);
    amountControl.updateValueAndValidity();
  }

  isStudentAssigned(studentId: number): boolean {
    return this.assignedStudents.has(studentId)
  }

  addStudentToBrief(student: Student): void {
    this.assignedStudents.set(student.id, student)
    this.updateAmountValidator()
  }

  removeStudentFromBrief(studentId: number): void {
    this.assignedStudents.delete(studentId)
    this.updateAmountValidator()
  }

  getOngoingPromoName(student: Student): string {
    const ongoingPromo = student.promos.find(promo => promo.status === 'ongoing');
    return ongoingPromo?.name || 'no valid promo';
  }

  generateGroups() {
    this.groups = []
    const amount = this.countNecessaryGroups(this.assignedStudentAmount, this.form.get('amountPerGroup')!.value)
    console.log("amount of groups", amount)
    for (let index = 0; index < amount; index++) {
      this.groups.push({
        name: `Group ${index}`,
        members: []
      })
    }
    this.allocateStudentsToGroups()
    console.log(this.groups)
  }

  countNecessaryGroups(studentAmount: number, amountPerGroup: number) {
    return Math.ceil(studentAmount / amountPerGroup)
  }
  countMaxPerGroups(studentAmount: number, amountPerGroup: number) {
    return Math.ceil(studentAmount / amountPerGroup)
  }

  allocateStudentsToGroups() {
    let studentsToAllocate = Array.from(this.assignedStudents.values())
    const maxPerGroup = this.form.get('amountPerGroup')!.value
    for (const group of this.groups) {
      while (group.members.length < maxPerGroup && studentsToAllocate.length > 0) {
        const indexOfStudentToAdd = this.pickRandomStudentIndex(studentsToAllocate)
        group.members.push(studentsToAllocate[indexOfStudentToAdd])
        studentsToAllocate.splice(indexOfStudentToAdd, 1)
      }
    }
  }

  private pickRandomStudentIndex(availableStudents: Student[]): number {
    const randomIndex = Math.floor(Math.random() * availableStudents.length)
    return randomIndex
  }
}
