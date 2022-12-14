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

/**
 * @class fetchApiDataService
 * @description This class is used to fetch data from the server.
 * @property {HttpClient} http - This property is used to send requests to the server.
 *
 */
export class fetchApiDataService {
  /**
   * @constructor fetchApiDataService
   * @param {HttpClient} http - This property is used to send requests to the server.
   */

  constructor(private http: HttpClient) {}

  /**
   * @name userRegistration
   * @description This method will send a request to the server to register a new user
   * @param {any} userDetails - This parameter is used to pass the user details to the server.
   * @returns Observable of the user details
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(API_URL + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @name userLogin
   * @description This method will send a request to the server to login a user
   * @param {any} userDetails - This parameter is used to pass the user details to the server.
   * @returns Observable of the user details
   */

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

  /**
   * @name getSingleMovie
   * @description This method will send a request to the server to get a single movie
   * @param {string} Title - This parameter is used to pass the title of the movie to the server.
   * @returns Observable of the movie details
   */

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
   * @description This method will send a request to the server to get all movies by a specific director
   * @param {string} directorName - This parameter is used to pass the name of the director to the server.
   * @returns Observable of the director details
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
   * @name getGenre
   * @description This method will send a request to the server to get all movies by a specific genre
   * @param {string} genreName - This parameter is used to pass the name of the genre to the server.
   * @returns Observable of the genre details
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
   * @description This method will send a request to the server to get all movies by a specific user
   * @returns Observable of the user details
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
   * @description This method will send a request to the server to get all movies by a specific user
   * @returns Observable of the user details
   */

  getFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(API_URL + 'users/' + username + '/movies/', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @name addFavoriteMovies
   * @description This method will send a request to the server to add a movie to a user's favorites
   * @param {string} MovieID - This parameter is used to pass the ID of the movie to the server.
   * @returns Observable of the user details
   */

  addFavoriteMovies(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(
        API_URL + 'users/' + username + '/movies/' + MovieID,
        { favoriteMovie: MovieID },
        {
          headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @name updateUserProfile
   * @description This method will send a request to the server to update a user's profile
   * @param {string} UpdateUser - This parameter is used to pass the updated user details to the server.
   * @returns Observable of the user details
   */

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


  /**
   * @name deleteUserProfile
   * @description This method will send a request to the server to delete a user's profile
   * @returns Observable of the user details
   */


  deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    return this.http
      .delete(`${API_URL}/users/${username}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }


  /**
   * @name removeFavoriteMovies
   * @description This method will send a request to the server to remove a movie from a user's favorites
   * @param {string} MovieID - This parameter is used to pass the ID of the movie to the server.
   * @returns Observable of the user details
   */

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

  // Error handling
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
