import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map, Observable, take } from 'rxjs';
import { Brief, Student, User } from '../../../../types/types';
import { UserService } from '../../../services/user.service';
import { PromoService } from '../../../services/promo.service';
import { CommonModule } from '@angular/common';
import { BriefService } from '../../../services/brief.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkDragDrop, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DragDropModule],
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
        Validators.compose(
          [
            Validators.required,
            Validators.min(1)
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

  hasStudentDoneDWWM(student: Student) {
    return student.degrees.includes("DWWM")
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
        name: `Group ${index + 1}`,
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
    const mixDwwm = this.form.get('mixDwwm')?.value;
    const amountPerGroup = this.form.get('amountPerGroup')!.value;
    const totalGroups = this.groups.length;

    const students = Array.from(this.assignedStudents.values());

    // Clear groups
    this.groups.forEach(group => group.members = []);

    if (!mixDwwm) {
      // Default random allocation
      let studentsToAllocate = this.shuffleArray([...students]);
      while (studentsToAllocate.length > 0) {
        for (const group of this.groups) {
          if (group.members.length < amountPerGroup && studentsToAllocate.length > 0) {
            group.members.push(studentsToAllocate.pop()!);
          }
        }
      }
      return;
    }

    // Split by DWWM flag
    let dwwmStudents = students.filter(s => this.hasStudentDoneDWWM(s));
    let nonDwwmStudents = students.filter(s => !this.hasStudentDoneDWWM(s));

    // Shuffle to avoid bias
    dwwmStudents = this.shuffleArray(dwwmStudents);
    nonDwwmStudents = this.shuffleArray(nonDwwmStudents);

    // Balanced distribution
    for (let i = 0; i < totalGroups; i++) {
      const group = this.groups[i];

      while (group.members.length < amountPerGroup && (dwwmStudents.length > 0 || nonDwwmStudents.length > 0)) {
        if (dwwmStudents.length > 0 && group.members.every(s => !this.hasStudentDoneDWWM(s))) {
          group.members.push(dwwmStudents.pop()!);
        } else if (nonDwwmStudents.length > 0 && group.members.every(s => this.hasStudentDoneDWWM(s))) {
          group.members.push(nonDwwmStudents.pop()!);
        } else if (dwwmStudents.length > nonDwwmStudents.length) {
          group.members.push(dwwmStudents.pop()!);
        } else if (nonDwwmStudents.length > dwwmStudents.length) {
          group.members.push(nonDwwmStudents.pop()!);
        } else if (dwwmStudents.length > 0) {
          group.members.push(dwwmStudents.pop()!);
        } else if (nonDwwmStudents.length > 0) {
          group.members.push(nonDwwmStudents.pop()!);
        } else {
          break;
        }
      }
    }
  }

  private shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  onStudentDrop(event: CdkDragDrop<Student[]>, targetGroup: { name: string, members: Student[] }) {
    const previousGroup = this.groups.find(g => g.members === event.previousContainer.data);
    const currentGroup = this.groups.find(g => g.members === event.container.data);

    if (!previousGroup || !currentGroup) return;

    // Move the student from the previous group to the new one
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  get connectedDropListIds(): string[] {
    return this.groups.map((_, i) => 'group-' + i);
  }
}
