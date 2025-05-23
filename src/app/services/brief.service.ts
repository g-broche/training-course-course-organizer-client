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

  /**
   * returns all available briefs
   * @returns brief array
   */
  retrieveBriefs() {
    return this.http.get<{ data: Brief[] }>('assets/mock-data/briefs.json').pipe(
      map((response) => response.data)
    );
  }

  /**
   * returns a specific brief if found
   * @param id brief id to look for
   * @returns Observable brief or null to resolve
   */
  retrieveBriefById(id: number): Observable<Brief | null> {
    return this.http.get<{ data: Brief[] }>('assets/mock-data/briefs.json').pipe(
      map((response) => {
        const brief = response.data.find(brief => brief.id === id);
        return brief ?? null;
      })
    );
  }
}
