import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Coordinate} from "../_models/cooridinate";

@Injectable()
export class CoordinatorService {

  public coordinates: Coordinate[];
  public token: string;

  constructor(private http: Http) {
    // set token if saved in local storage
    let coordinates = JSON.parse(localStorage.getItem('coordinates'));
    this.coordinates = coordinates;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  run(address: string, destination: string): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://127.0.0.1:8000/api/coordinates', JSON.stringify({ address: address, destination: destination}), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let coordinates = response.json();
        if (coordinates) {
          // set token property
          this.coordinates = coordinates;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('coordinates', JSON.stringify({
            address: coordinates.adddress,
            destination: coordinates.destination,
          }));
          // return true to indicate successful got the coordinates
          return this.coordinates;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  reload(): void {
    // clear token remove user from local storage to log user out
    this.coordinates = null;
    localStorage.removeItem('coordinates');
  }

}
