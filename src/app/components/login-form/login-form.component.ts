import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { UserService } from '../../services/user.service';
import { User } from '../../../types/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  form!: FormGroup;

  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * attempts to log user based on provided credentials
   */
  submit() {
    const credentials = this.form.value;
    this.userService.logTestUser(credentials).subscribe({
      next: (user) => {
        this.modalService.close();
      },
      error: () => {
        this.error = 'Invalid credentials';
      }
    });
  }
}