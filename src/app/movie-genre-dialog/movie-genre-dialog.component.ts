import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-genre-dialog',
  standalone: false,
  templateUrl: './movie-genre-dialog.component.html',
  styleUrl: './movie-genre-dialog.component.scss',
})
export class MovieGenreDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MovieGenreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { genre: any }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
