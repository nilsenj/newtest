import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Proposal} from "../_models/proposal";

@Injectable()
export class UberProposalsService {

  public proposals: Proposal[];
  public token: string;

  constructor(private http: Http) {
    // set token if saved in local storage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  run(address: any, destination: any): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://http://127.0.0.1:8000/api/uber/priceEstimates', JSON.stringify({ address: address, destination: destination}), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let proposals = response.json();
        if (proposals) {
          // set token property
          this.proposals = proposals;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          // return true to indicate successful got the proposals
          return this.proposals;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }
  remove(): void {
    // clear token remove user from local storage to log user out
    this.proposals = null;
  }
}
