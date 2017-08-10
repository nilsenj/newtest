import {OnInit} from "@angular/core";

import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {arrays} from "../_helpers/arrays";
import {Http} from "@angular/http";

export abstract class UserBase implements OnInit{
  user: User[] = [];
  authenticated: boolean = false;

  constructor(protected userService: UserService) {
    this.userService.userEvent.subscribe(data => {
      this.getUser();
    });
  }

  ngOnInit() {
    // get users from secure api end point
    this.getUser();
  }

  getUser() {
    // get users from secure api end point
    if (this.userService.token) {
      this.userService.getAuthenticatedUser()
        .subscribe(users => {
          this.user = arrays.transformToArray(users);
          this.authenticated = true;
        }, (error) => {
          this.user = [];
          this.authenticated = false;

          localStorage.removeItem('currentUser');
          localStorage.removeItem('io')
        });
    } else {
      this.user = [];
      this.authenticated = false;
      this.userService.logout();
    }
  }
}
