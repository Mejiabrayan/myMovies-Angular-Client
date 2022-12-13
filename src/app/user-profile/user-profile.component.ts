import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fetchApiDataService } from '../fetch-api-data.service';

import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: fetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  // fetches user information from our api
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  updateUser(): void {
    this.dialog.open(EditUserProfileComponent, {
      width: '400px',
    });
  }
  deleteUserProfile(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.router.navigate(['Welcome']).then(() => {
        this.snackBar.open('Your account has been deleted', 'Ok', {
          duration: 2000,
        });
      });
      this.fetchApiData.deleteUserProfile().subscribe((resp: any) => {
        localStorage.clear();
        console.log(resp);
        return this.user;
      });
    }
  }
}
