import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://flixhive-cf7fbbd939d2.herokuapp.com';

@Injectable({
  providedIn: 'root'
})

//assignment in 6.2 named UserRegistrationService ?? 
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  constructor(private http: HttpClient) { }

  //Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {}
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  // Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log('userLogin request:', userDetails);
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Test method to check login response structure
  public testLogin(userDetails: any): Observable<any> {
    console.log('Testing login with:', userDetails);
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      map((response: any) => {
        console.log('Raw login response:', response);
        console.log('Response keys:', Object.keys(response));
        if (response.user) {
          console.log('User object keys:', Object.keys(response.user));
          console.log('Full user object:', response.user);
        }
        return response;
      }),
      catchError((error) => {
        console.error('Login test error:', error);
        return this.handleError(error);
      })
    );
  }

  // Get all movies
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get one movie
  public getMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get director
  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/directors/${directorName}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get genre
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/genres/${genreName}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get user
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = this.getUsername();
    
    if (!username) {
      return throwError('User not authenticated');
    }
    
    return this.http.get(apiUrl + `/users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get favorite movies for a user
  public getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = this.getUsername();
    
    if (!username) {
      return throwError('User not authenticated');
    }
    
    return this.http.get(apiUrl + `/users/${username}/favorites`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Add a movie to favorite Movies
  public addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = this.getUsername();
    
    if (!username) {
      return throwError('User not authenticated');
    }
    
    return this.http.post(apiUrl + `/users/${username}/favorites/${movieId}`, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Edit user
  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = this.getUsername();
    
    if (!username) {
      return throwError('User not authenticated');
    }
    
    return this.http.put(apiUrl + `/users/${username}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete user
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = this.getUsername();
    
    if (!username) {
      return throwError('User not authenticated');
    }
    
    return this.http.delete(apiUrl + `/users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete a movie from the favorite movies
  public deleteFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = this.getUsername();
    
    if (!username) {
      return throwError('User not authenticated');
    }
    
    return this.http.delete(apiUrl + `/users/${username}/favorites/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Helper method to get username from localStorage with fallback
  private getUsername(): string | null {
    let username = localStorage.getItem('username');
    console.log('getUsername - direct username from localStorage:', username);
    
    // Fallback: try to get username from stored user object
    if (!username) {
      const userObj = localStorage.getItem('user');
      console.log('getUsername - user object from localStorage:', userObj);
      if (userObj) {
        try {
          const user = JSON.parse(userObj);
          console.log('getUsername - parsed user object:', user);
          // Try different possible field names for username
          username = user.Username || user.username || user.name || user.userName;
          console.log('getUsername - extracted username from user object:', username);
          // Store it for future use
          if (username) {
            localStorage.setItem('username', username);
            console.log('getUsername - stored username for future use');
          }
        } catch (error) {
          console.error('getUsername - error parsing user object:', error);
        }
      }
    }
    
    console.log('getUsername - final username:', username);
    return username;
  }
}