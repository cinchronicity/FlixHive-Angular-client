import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-director-dialog',
  standalone: false,
  templateUrl: './movie-director-dialog.component.html',
  styleUrl: './movie-director-dialog.component.scss',
})
export class MovieDirectorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MovieDirectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { director: any }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
