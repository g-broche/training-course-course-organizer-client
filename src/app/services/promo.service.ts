import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { MockPromo, Student } from '../../types/base';
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

  /**
   * Returns the students managed by the logged user based of the user assigned promos which
   * have an ongoing status.
   */
  get managedStudents$(): Observable<Student[]> {
    return this.userService.userPromos$.pipe(
      switchMap((promos) => {
        if (!promos || promos.length === 0) {
          return of([]);
        }

        return this.http.get<{ data: Student[] }>('assets/mock-data/students.json').pipe(
          map((response) => {
            const ongoingPromoIds = promos.filter(promo => promo.status === "ongoing").map(promo => promo.id)
            console.log(promos, ongoingPromoIds)
            const foundStudents = response.data.filter(student =>
              student.promos?.some(promo => ongoingPromoIds.includes(promo.id))
            );

            // sorting students by promos and then by last name for easier data reading
            return foundStudents.sort((a, b) => {
              const aPromoId = a.promos?.find(p => ongoingPromoIds.includes(p.id))?.id!;
              const bPromoId = b.promos?.find(p => ongoingPromoIds.includes(p.id))?.id!;

              if (aPromoId !== bPromoId) {
                return aPromoId - bPromoId;
              }
              return a.lastName.localeCompare(b.lastName);
            });
          })
        );
      })
    );
  }
}
