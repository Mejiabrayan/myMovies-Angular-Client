import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * @component WelcomePageComponent
 * @description This component is the welcome page of the application.
 * @class WelcomePageComponent
 * @implements OnInit
 * @property {MatDialog} dialog - This property is used to open the dialog box.
 * @method openUserRegistrationDialog - This method is used to open the user registration dialog box.
 */


@Component({

  /**
   * @property {string} selector - This property is used to define the selector of the component.
   * @property {string} templateUrl - This property is used to define the template of the component.
   * @property {string} styleUrls - This property is used to define the style of the component.
   */


  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}


  /**
   * @method openUserRegistrationDialog
   * @description This method is used to open the user registration dialog box.
   * @returns {void}
   */


  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {});
  }
  /**
   * @method openUserLoginDialog
   * @description This method is used to open the user login dialog box.
   * @returns {void}
   */


  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {});
  }
}
