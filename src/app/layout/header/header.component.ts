import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../../types/types';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user$: Observable<User | null>
  constructor(private userService: UserService, private modal: ModalService) {
    this.user$ = this.userService.user$
  }

  openLogin() {
    this.modal.open(LoginFormComponent);
  }
}
