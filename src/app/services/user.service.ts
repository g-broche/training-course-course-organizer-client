import { Injectable } from '@angular/core';
import { Credentials, MockUser, User } from '../../types/types';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { omit } from '../shared/utils/data-utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  setUser(user: User) {
    this.userSubject.next(user);
  }

  get user(): User | null {
    return this.userSubject.value;
  }

  login(credentials: Credentials): Observable<User> {
    return this.http.post<User>('/api/login', credentials).pipe(
      tap((user) => this.setUser(user)) // Automatically store the user
    );
  }

  logTestUser(credentials: Credentials): Observable<User> {
    return this.http.get<{ users: MockUser[] }>('/assets/mock-data/users.json').pipe(
      map((response) => {
        const foundUser = response.users.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );
        if (!foundUser) throw new Error('Invalid credentials');

        const apiLikeUser: User = omit(foundUser, ["password", "created_by"])
        this.setUser(apiLikeUser as User);
        console.log(foundUser, apiLikeUser)
        return apiLikeUser as User;
      })
    );
  }

  get isUserLogged$(): Observable<boolean> {
    return this.user$.pipe(
      map(user => !!user)
    );
  }

  get isUserTeacher$(): Observable<boolean> {
    return this.user$.pipe(
      map(user => !!user && user.roles.includes('teacher'))
    );
  }
}
