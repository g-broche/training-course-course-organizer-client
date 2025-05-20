import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Brief } from '../../types/types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BriefService {
  constructor(private http: HttpClient) {
  }

  retrieveBriefs() {
    return this.http.get<{ data: Brief[] }>('/assets/mock-data/briefs.json').pipe(
      map((response) => response.data)
    );
  }
}
