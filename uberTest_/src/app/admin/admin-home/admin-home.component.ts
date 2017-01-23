import { Component } from '@angular/core';
import {User} from '../../_models/user';
import {UserService} from '../../_services/user.service';
import {arrays} from '../../_helpers/arrays';
import {UserBase} from '../../abstracts/user.base';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent extends UserBase {
  constructor(protected userService: UserService) {
    super(userService);
  }
}
