import { Component } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Brief, Student, User } from '../../../../types/types';
import { UserService } from '../../../services/user.service';
import { PromoService } from '../../../services/promo.service';
import { CommonModule } from '@angular/common';
import { BriefService } from '../../../services/brief.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
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

  get groupNameInputs(): FormArray {
    return this.form.get('groupNames') as FormArray;
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
    this.generateForm();
  }

  generateForm() {
    this.form = this.formBuilder.group({
      amount: [
        1,
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ],
      password: ['', Validators.required],
      mixDwwm: [false],
      mixAges: [false],
      groupNames: this.formBuilder.array([])
    });

    this.studentList$.subscribe((students) => {
      const maxAmount = Math.floor((students?.length || 0) / 2);
      const amountControl = this.form.get('amount');
      if (amountControl) {
        amountControl.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(maxAmount)
        ]);
        amountControl.updateValueAndValidity();
      }
    });

    this.form.get('amount')?.valueChanges.subscribe((newAmount: number) => {
      this.adjustInputs(newAmount);
    });
  }

  isStudentAssigned(studentId: number): boolean {
    return this.assignedStudents.has(studentId)
  }

  addStudentToBrief(student: Student): void {
    this.assignedStudents.set(student.id, student)
    console.log(this.assignedStudents)
  }

  removeStudentFromBrief(studentId: number): void {
    this.assignedStudents.delete(studentId)
    console.log(this.assignedStudents)
  }

  getOngoingPromoName(student: Student): string {
    const ongoingPromo = student.promos.find(promo => promo.status === 'ongoing');
    return ongoingPromo?.name || 'no valid promo';
  }

  private adjustInputs(count: number) {
    const inputGroupNameArray = this.groupNameInputs;
    const currentLength = inputGroupNameArray.length;

    if (count > currentLength) {
      for (let i = currentLength; i < count; i++) {
        inputGroupNameArray.push(this.formBuilder.control(''));
      }
    } else if (count < currentLength) {
      for (let i = currentLength - 1; i >= count; i--) {
        inputGroupNameArray.removeAt(i);
      }
    }
  }

  generateGroups() {

  }
}
