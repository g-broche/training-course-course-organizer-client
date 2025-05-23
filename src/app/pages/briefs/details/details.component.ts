import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Brief, Student, User } from '../../../../types/types';
import { UserService } from '../../../services/user.service';
import { PromoService } from '../../../services/promo.service';
import { CommonModule } from '@angular/common';
import { BriefService } from '../../../services/brief.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkDragDrop, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { isReturnStatement } from 'typescript';


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
  isGroupGenerationLocked = false;

  get assignedStudentAmount(): number {
    return this.assignedStudents.size
  }

  get areStudentsAssigned(): boolean {
    return this.assignedStudents.size > 0
  }

  get isBriefGroupIntended(): boolean {
    return this.groups.length > 0
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

  /**
   * creates form group for controls related to group generation config
   */
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

  /**
   * updates the validator for group amount to reflect the amount of assigned students
   */
  private updateAmountValidator(): void {
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

  hasStudentDoneDWWM(student: Student) {
    return student.degrees.includes("DWWM")
  }

  isStudentAssigned(studentId: number): boolean {
    return this.assignedStudents.has(studentId)
  }

  /**
   * converts the student age received in dd/mm/yyyy format to a Date
   * and then compares it to now to calculate the student's age
   * @param student 
   * @returns student age
   */
  calculateStudentAge(student: Student): number {
    const [day, month, year] = student.birthdate.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!hasHadBirthdayThisYear) {
      age--;
    }

    return age;
  }

  addStudentToBrief(student: Student): void {
    if (this.isGroupGenerationLocked) { return }
    this.assignedStudents.set(student.id, student)
    this.updateAmountValidator()
  }

  removeStudentFromBrief(studentId: number): void {
    this.assignedStudents.delete(studentId)
    this.updateAmountValidator()
  }

  /**
   * get the promo the student is currently following based on promo status being "ongoing"
   * @param student 
   * @returns promo name.
   */
  getOngoingPromoName(student: Student): string {
    const ongoingPromo = student.promos.find(promo => promo.status === 'ongoing');
    return ongoingPromo?.name || 'no valid promo';
  }

  /**
   * Generates groups based on the number of assigned studen of the desired group size
   * and then allocated students to them
   */
  generateGroups(): void {
    if (this.isGroupGenerationLocked || !this.areStudentsAssigned) { return; }
    const amount = this.countNecessaryGroups(this.assignedStudentAmount, this.form.get('amountPerGroup')!.value)
    this.createRequiredGroups(amount)
    this.allocateStudentsToGroups()
  }

  /**
   * creates required about of groups
   * @param amount 
   */
  createRequiredGroups(amount: number) {
    this.groups = []
    for (let index = 0; index < amount; index++) {
      this.groups.push({
        name: `Group ${index + 1}`,
        members: []
      })
    }
  }

  countNecessaryGroups(studentAmount: number, amountPerGroup: number) {
    return Math.ceil(studentAmount / amountPerGroup)
  }

  /**
   * Allocates students to group per defined group config
   * @returns 
   */
  allocateStudentsToGroups(): void {
    const mixDwwm = this.form.get('mixDwwm')?.value;
    const amountPerGroup = this.form.get('amountPerGroup')!.value;

    const students = Array.from(this.assignedStudents.values());

    // Clear groups in case this is not the first generation attempt
    this.groups.forEach(group => group.members = []);

    // Use the allocation method depending on user config selection
    if (!mixDwwm) {
      this.allocateGroupMembersRandomly(students, amountPerGroup);
      return;
    }
    this.allocateGroupMembersRandomlyWhileBalancingDWWM(students, amountPerGroup);

  }

  /**
   * allocate students randomly to groups using the given students and amount per group
   * @param students 
   * @param amountPerGroup 
   */
  allocateGroupMembersRandomly(students: Student[], amountPerGroup: number) {
    let studentsToAllocate = this.shuffleArray([...students]);
    while (studentsToAllocate.length > 0) {
      for (const group of this.groups) {
        if (group.members.length < amountPerGroup && studentsToAllocate.length > 0) {
          group.members.push(studentsToAllocate.pop()!);
        }
      }
    }
  }

  /**
   * allocate students randomly while also keeping a balance between DWWM and non DWWM students
   * as much as the spread between both permits it
   * @param students 
   * @param amountPerGroup 
   */
  allocateGroupMembersRandomlyWhileBalancingDWWM(students: Student[], amountPerGroup: number) {
    // Split students based on DWWM factor
    let dwwmStudents = students.filter(s => this.hasStudentDoneDWWM(s));
    let nonDwwmStudents = students.filter(s => !this.hasStudentDoneDWWM(s));

    // Shuffle both arrays to make the generation non static
    dwwmStudents = this.shuffleArray(dwwmStudents);
    nonDwwmStudents = this.shuffleArray(nonDwwmStudents);

    // For each group
    for (let i = 0; i < this.groups.length; i++) {
      const group = this.groups[i];

      // while the group hasn't reached desired size and there are students available to add
      while (group.members.length < amountPerGroup && (dwwmStudents.length > 0 || nonDwwmStudents.length > 0)) {
        // if the group has no student with DWWM, add a DWWM student
        if (dwwmStudents.length > 0 && group.members.every(s => !this.hasStudentDoneDWWM(s))) {
          group.members.push(dwwmStudents.pop()!);
          // if the group has no student without DWWM, add a student without DWWM
        } else if (nonDwwmStudents.length > 0 && group.members.every(s => this.hasStudentDoneDWWM(s))) {
          group.members.push(nonDwwmStudents.pop()!);
          // If there are already student of both types then attribute the type which is more numerous
          // is the remaining students to allocate
        } else if (dwwmStudents.length > nonDwwmStudents.length) {
          group.members.push(dwwmStudents.pop()!);
        } else if (nonDwwmStudents.length > dwwmStudents.length) {
          group.members.push(nonDwwmStudents.pop()!);
          // fallback cases to fill group and make sure everyone is put in
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

  /**
   * Handles drag and drop event to manually associate a student to a different
   * @param event 
   * @param targetGroup 
   * @returns 
   */
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

  /**
   * required to make the drag and drop work
   */
  get connectedDropListIds(): string[] {
    return this.groups.map((_, i) => 'group-' + i);
  }

  /**
   * will prevent further assignement and generation
   * if a backend existed in brief it would also use the brief service for a create (or update)
   * request
   */
  lockGroups() {
    this.isGroupGenerationLocked = true;
  }
}
