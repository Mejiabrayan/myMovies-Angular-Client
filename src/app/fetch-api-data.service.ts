import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const API_URL = 'https://myflix-movieapp-bylisa.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class fetchApiDataService {
  constructor(private http: HttpClient) {}
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(API_URL + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(API_URL + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @name getAllMovies
   * @description This method will send a request to the server to get all movies
   * @returns Observable of all movies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(API_URL + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getSingleMovie(Title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${API_URL}movies/${Title}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @name getDirector
   * This method will send a request to the server to get all movies by a specific director
   * @param directorName
   * @returns
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${API_URL}movies/directors/${directorName}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   *@name getGenre
   * This method will send a request to the server to get all movies by a specific genre
   * @param genreName
   * @returns
   */

  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(`${API_URL}movies/genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @name getUser
   * This method will send a request to the server to get all movies by a specific user
   * @returns
   */

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(API_URL + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @name getFavoriteMovies
   * This method will send a request to the server to get all movies by a specific user
   */
   getFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(API_URL + 'users/' + username + '/movies/', {
        headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
    .pipe(map(this.extractResponseData),catchError(this.handleError));
  }


  addFavoriteMovies(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    return this.http
      .put(`${API_URL}users/${username}/movies/${MovieID} any`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  updateUserProfile(UpdateUser: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    return this.http
      .put(`${API_URL}users/${username}`, UpdateUser, {
        headers: new HttpHeaders({
          Authorization: `Bearer + ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    return this.http
      .delete(`${API_URL}/users/${username}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  removeFavoriteMovies(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    return this.http
      .delete(`${API_URL}users/${username}/movies/${MovieID}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
