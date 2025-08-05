import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-synopsis-dialog',
  standalone: false,
  templateUrl: './movie-synopsis-dialog.component.html',
  styleUrl: './movie-synopsis-dialog.component.scss',
})
export class MovieSynopsisDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MovieSynopsisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { movie: any }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
