import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Brief } from '../../types/types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BriefService {
  constructor(private http: HttpClient) {
  }

  retrieveBriefs() {
    return this.http.get<{ data: Brief[] }>('assets/mock-data/briefs.json').pipe(
      map((response) => response.data)
    );
  }

  retrieveBriefById(id: number): Observable<Brief | null> {
    return this.http.get<{ data: Brief[] }>('assets/mock-data/briefs.json').pipe(
      map((response) => {
        const brief = response.data.find(brief => brief.id === id);
        return brief ?? null;
      })
    );
  }
}
