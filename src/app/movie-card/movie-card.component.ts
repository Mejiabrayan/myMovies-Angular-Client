// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { fetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: fetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }
  // Fetches Movies from API
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '400px',
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
        this.favorites = resp.favoriteMovies;
        console.log(this.favorites);
        return this.favorites;
      });
    }

  // checks if movie is in user's favorites
  isFavoriteMovies(movieId: string): boolean {
    return this.favorites.includes(movieId);
  }

  //Adds movie to user's favorites
  addFavorite(MovieID: string): void {
    this.fetchApiData.addFavoriteMovies(MovieID).subscribe((result) => {
      //this.dialogRef.close(); // This will close the modal on success!
      console.log(result);
      this.snackBar.open('You have added this movie to your favorites!', 'OK', {
        duration: 3000,
      });
      this.ngOnInit();
    });
  }
  // deletes movie from user's favorites
  deleteFavorite(MovieID: string): void {
    this.fetchApiData.removeFavoriteMovies(MovieID).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open('Movie removed from favorites!', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  //opens genre window
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '450px',
    });
  }
  // opens director window
  openDirector(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
    });
  }
}
