import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { MockPromo } from '../../types/types';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  private promoListSubject = new BehaviorSubject<MockPromo[] | null>(null);
  promoList$ = this.promoListSubject.asObservable();
  constructor(private userService: UserService, private http: HttpClient) {
    this.promoList$ = this.userService.userPromos$.pipe(
      switchMap((promoIds) => {
        if (!promoIds) {
          console.log("null promos")
          return of(null);
        }
        return this.http.get<{ data: MockPromo[] }>('/assets/mock-data/promos.json').pipe(
          map((response) => {
            const result = response.data.filter((promo) => promoIds.includes(promo.id))
            console.log("got promos :", result)
            return result
          }
          )
        );
      })
    );
  }
}
