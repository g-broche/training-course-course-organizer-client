import { Component } from '@angular/core';
import { DashboardMenuComponent } from '../dashboard-menu/dashboard-menu.component';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, DashboardMenuComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isUserLogged$: Observable<boolean>;
  constructor(private userService: UserService) {
    this.isUserLogged$ = this.userService.isUserLogged$;
  }
}
