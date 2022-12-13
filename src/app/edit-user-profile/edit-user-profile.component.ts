import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss'],
})
export class EditUserProfileComponent implements OnInit {
  user: any = {};

  @Input() loggedUser = {
    Username: '',
    Password: '',
    Email: '',
    // no need to update birthday. Most apps don't have this option after sign up so I follow
  };

  constructor(
    public fetchApiData: fetchApiDataService,
    public dialogRef: MatDialogRef<EditUserProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      this.loggedUser.Username = this.user.Username;
      this.loggedUser.Password = this.user.Password;
      this.loggedUser.Email = this.user.Email;
      console.log(this.loggedUser);
    });
  }

  updateUser(): void {
    this.fetchApiData.updateUserProfile(this.loggedUser).subscribe((result) => {
      console.log(result);
      this.dialogRef.close();
      localStorage.clear();
      this.router.navigate(['welcome']);
      this.snackBar.open(
        'Profile updated, please login again with your new credentials.',
        'OK',
        {
          duration: 2000,
        }
      );
    });
  }
  deleteUserProfile(): void {
    this.fetchApiData.deleteUserProfile().subscribe((result) => {
      console.log(result);
      this.dialogRef.close();
      localStorage.clear();
      this.router.navigate(['welcome']);
      this.snackBar.open('Profile deleted', 'OK', {
        duration: 2000,
      });
    });
  }
}
