import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { CommonModule } from '@angular/common';
import { map, Observable, take } from 'rxjs';
import { User } from '../../../types/base';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { UserControlsComponent } from '../../components/user-controls/user-controls.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, UserControlsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title!: string
  user$: Observable<User | null>
  mustOpenUserControls: boolean = false
  constructor(private userService: UserService, private modal: ModalService) {
    this.user$ = this.userService.user$
  }

  /**
   * Opens login form through modal component
   */
  openLogin() {
    this.modal.open(LoginFormComponent);
  }

  logout() {
    console.log("triggered")
    this.userService.logout()
    this.mustOpenUserControls = false
  }

  /**
   * toggles the user window to see detailed information and logout
   */
  toggleUserControls() {
    this.user$.pipe(take(1)).subscribe(user => {
      if (!user) {
        this.mustOpenUserControls = false;
        return;
      }

      this.mustOpenUserControls = !this.mustOpenUserControls;
    });
  }
}
