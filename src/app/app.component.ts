// import { Component } from '@angular/core';
// import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
// import { MatDialog } from '@angular/material/dialog';
// import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
// import { MovieCardComponent } from './movie-card/movie-card.component';


// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   standalone: false,
//   styleUrl: './app.component.scss',
// })
// export class AppComponent {
//   title = 'FlixHive-Angular-client';
//   constructor(public dialog: MatDialog) {}
//   // This is the function that will open the dialog when the signup button is clicked
//   openUserRegistrationDialog(): void {
//     this.dialog.open(UserRegistrationFormComponent, {
//       // Assigning the dialog a width
//       width: '280px',
//     });
//   }
//   // This is the function that will open the dialog when the login button is clicked
//   openUserLoginDialog(): void {
//     this.dialog.open(UserLoginFormComponent, {
//       width: '280px',
//     });
//   }

//   openMoviesDialog(): void {
//     this.dialog.open(MovieCardComponent, {
//       width: '500px'
//     });
//   }

// }


import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false, 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Flixhive-Angular-client';
}