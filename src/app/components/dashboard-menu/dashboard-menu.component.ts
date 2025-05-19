import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../types/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-menu',
  imports: [CommonModule],
  templateUrl: './dashboard-menu.component.html',
  styleUrl: './dashboard-menu.component.scss'
})
export class DashboardMenuComponent {
  isUserTeacher$: Observable<boolean>;
  constructor(private userService: UserService) {
    this.isUserTeacher$ = this.userService.isUserTeacher$;
  }
}
