import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile{
  protected authService = inject(AuthService);
  readonly currentUser = this.authService.currentUser;
}
