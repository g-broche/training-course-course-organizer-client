import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { MockPromo, Student } from '../../types/types';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  private promoListSubject = new BehaviorSubject<MockPromo[] | null>(null);
  promoList$ = this.promoListSubject.asObservable();
  private studentListSubject = new BehaviorSubject<Student[] | null>(null);
  studentList$ = this.studentListSubject.asObservable();
  constructor(private userService: UserService, private http: HttpClient) {
    this.promoList$ = this.userService.userPromos$
  }
  get managedStudents$(): Observable<Student[]> {
    return this.userService.userPromos$.pipe(
      switchMap((promos) => {
        if (!promos || promos.length === 0) {
          return of([]);
        }

        return this.http.get<{ data: Student[] }>('assets/mock-data/students.json').pipe(
          map((response) => {
            const promoIds = promos.filter(promo => promo.status = "ongoing").map(promo => promo.id)
            return response.data.filter(student =>
              student.promos?.some(promo => promoIds.includes(promo.id))
            ).sort((a: Student, b: Student) => a.lastName.localeCompare(b.lastName));
          })
        );
      })
    );
  }
}
