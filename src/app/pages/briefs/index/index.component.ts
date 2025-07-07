import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Brief, User } from '../../../../types/base';
import { UserService } from '../../../services/user.service';
import { BriefService } from '../../../services/brief.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../layout/header/header.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'brief-index',
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class BriefIndexComponent implements OnInit {
  user$: Observable<User | null>;
  isUserTeacher$: Observable<boolean>;
  briefs$: Observable<Brief[]> = of([]);

  constructor(private userService: UserService, private briefService: BriefService, private router: Router) {
    this.user$ = this.userService.user$
    this.isUserTeacher$ = this.userService.isUserTeacher$;
  }

  ngOnInit() {
    this.briefs$ = this.briefService.retrieveBriefs();
  }
}
