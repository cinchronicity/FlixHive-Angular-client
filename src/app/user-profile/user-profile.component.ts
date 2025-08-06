import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];
  isEditing: boolean = false;

  userData: any = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      this.snackBar.open('Please log in to view your profile', 'OK', {
        duration: 3000,
      });
      this.router.navigate(['welcome']);
      return;
    }

    this.getUser();
    this.getFavoriteMovies();
  }

  /**
   * Get user profile data
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe(
      (resp: any) => {
        this.user = resp;
        this.userData = {
          Username: this.user.username, // API returns lowercase 'username'
          Password: '',
          Email: this.user.email, // API returns lowercase 'email'
          Birthday: this.user.birthdate
            ? new Date(this.user.birthdate).toISOString().split('T')[0] // API returns 'birthdate'
            : '',
        };
      },
      (error) => {
        console.error('Error getting user data:', error);
        this.snackBar.open('Failed to load user profile', 'OK', {
          duration: 3000,
        });
      }
    );
  }

  /**
   * Get user's favorite movies with full movie details
   */
  getFavoriteMovies(): void {
    // First get the favorite movie IDs
    this.fetchApiData.getFavoriteMovies().subscribe(
      (favoriteIds: string[]) => {
        if (favoriteIds.length === 0) {
          this.favoriteMovies = [];
          return;
        }

        // Then get all movies and filter to show only favorites
        this.fetchApiData.getAllMovies().subscribe(
          (allMovies: any[]) => {
            this.favoriteMovies = allMovies.filter((movie) =>
              favoriteIds.includes(movie._id)
            );
          },
          (error) => {
            console.error('Error getting all movies:', error);
          }
        );
      },
      (error) => {
        console.error('Error getting favorite movie IDs:', error);
      }
    );
  }

  /**
   * Enable editing mode
   */
  enableEdit(): void {
    this.isEditing = true;
  }

  /**
   * Cancel editing and reset form
   */
  cancelEdit(): void {
    this.isEditing = false;
    this.userData = {
      Username: this.user.username, // API returns lowercase 'username'
      Password: '',
      Email: this.user.email, // API returns lowercase 'email'
      Birthday: this.user.birthdate
        ? new Date(this.user.birthdate).toISOString().split('T')[0] // API returns 'birthdate'
        : '',
    };
  }

  /**
   * Update user profile
   */
  updateUser(): void {
    // Remove empty password if not provided
    const updateData = { ...this.userData };
    if (!updateData.Password) {
      delete updateData.Password;
    }

    this.fetchApiData.editUser(updateData).subscribe(
      (result) => {
        this.user = result;
        this.isEditing = false;
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        this.snackBar.open('Failed to update profile', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * Delete user account
   */
  deleteUser(): void {
    if (
      confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      this.fetchApiData.deleteUser().subscribe(
        (result) => {
          localStorage.clear();
          this.snackBar.open('Account deleted successfully', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['welcome']);
        },
        (error) => {
          this.snackBar.open('Failed to delete account', 'OK', {
            duration: 2000,
          });
        }
      );
    }
  }

  /**
   * Remove movie from favorites
   */
  removeFavorite(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe(
      (result) => {
        this.favoriteMovies = this.favoriteMovies.filter(
          (movie) => movie._id !== movieId
        );
        this.snackBar.open('Movie removed from favorites', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        this.snackBar.open('Failed to remove movie from favorites', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
