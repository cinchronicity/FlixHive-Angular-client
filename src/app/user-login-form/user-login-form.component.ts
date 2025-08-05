import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  standalone: false,
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (result) => {
        // Store the user and token in localStorage
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);

        // Try multiple possible username field names from the response
        const username =
          result.user?.Username ||
          result.user?.username ||
          result.user?.name ||
          result.user?.userName ||
          result.username || // Sometimes username is at root level
          this.loginData.username; // Fallback to what user entered

        if (username) {
          localStorage.setItem('username', username);
        } else {
          console.error('No username found in login response');
          console.error('Available fields in result:', Object.keys(result));
          console.error(
            'Available fields in result.user:',
            Object.keys(result.user || {})
          );
        }

        this.dialogRef.close(); // Close the dialog on success
        this.snackBar.open('Login successful!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']); // Navigate to the movies page
      },
      (error) => {
        console.error('Login error:', error);
        this.snackBar.open('Login failed. Please try again.', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
