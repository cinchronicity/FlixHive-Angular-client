import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieGenreDialogComponent } from '../movie-genre-dialog/movie-genre-dialog.component';
import { MovieDirectorDialogComponent } from '../movie-director-dialog/movie-director-dialog.component';
import { MovieSynopsisDialogComponent } from '../movie-synopsis-dialog/movie-synopsis-dialog.component';

@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
//needs to accept movies from API and nothing else
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovieIds: string[] = []; // Changed to store IDs instead of full objects

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * Get user's favorite movie IDs
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe(
      (resp: any) => {
        this.favoriteMovieIds = resp; // This is now an array of movie IDs
      },
      (error) => {
        console.error('Error getting favorite movies:', error);
        // If user is not authenticated, redirect to welcome page
        if (error.includes && error.includes('User not authenticated')) {
          this.snackBar.open('Please login to access favorites', 'OK', {
            duration: 3000,
          });
          this.router.navigate(['welcome']);
        }
      }
    );
  }

  /**
   * Check if a movie is in favorites
   */
  isFavorite(movieId: string): boolean {
    return this.favoriteMovieIds.includes(movieId);
  }

  /**
   * Toggle movie favorite status
   */
  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie._id)) {
      this.removeFavorite(movie._id);
    } else {
      this.addFavorite(movie._id);
    }
  }

  /**
   * Add movie to favorites
   */
  addFavorite(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe(
      (result) => {
        this.snackBar.open('Movie added to favorites!', 'OK', {
          duration: 2000,
        });
        this.getFavoriteMovies(); // Refresh favorites list
      },
      (error) => {
        this.snackBar.open('Failed to add movie to favorites', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * Remove movie from favorites
   */
  removeFavorite(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe(
      (result) => {
        this.snackBar.open('Movie removed from favorites', 'OK', {
          duration: 2000,
        });
        this.getFavoriteMovies(); // Refresh favorites list
      },
      (error) => {
        this.snackBar.open('Failed to remove movie from favorites', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * Open genre dialog
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(MovieGenreDialogComponent, {
      data: { genre: genre },
      width: '500px',
    });
  }

  /**
   * Open director dialog
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(MovieDirectorDialogComponent, {
      data: { director: director },
      width: '550px',
    });
  }

  /**
   * Open synopsis dialog
   */
  openSynopsisDialog(movie: any): void {
    this.dialog.open(MovieSynopsisDialogComponent, {
      data: { movie: movie },
      width: '700px',
      maxWidth: '90vw',
    });
  }

  /**
   * Logout user and redirect to welcome page
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
