import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { User } from '../../../types/types';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-controls',
  imports: [CommonModule],
  templateUrl: './user-controls.component.html',
  styleUrl: './user-controls.component.scss'
})
export class UserControlsComponent {
  user$: Observable<User | null>;
  @Input() mustOpen!: boolean
  @Output() logoutRequested = new EventEmitter<void>();
  constructor(private userService: UserService) {
    this.user$ = this.userService.user$;
  }

  /**
   * send request for logout to parent component
   */
  emitLogout() {
    this.logoutRequested.emit();
  }
}
