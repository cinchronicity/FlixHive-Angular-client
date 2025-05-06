import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://flixhive-cf7fbbd939d2.herokuapp.com/';

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
    return this.http.post(apiUrl + 'users', userDetails).pipe(
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
    console.log(userDetails);
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
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
    const username = localStorage.getItem('username');
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
    const username = localStorage.getItem('username');
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
    const username = localStorage.getItem('username');
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
    const username = localStorage.getItem('username');
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
    const username = localStorage.getItem('username');
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
    const username = localStorage.getItem('username');
    return this.http.delete(apiUrl + `/users/${username}/favorites/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}