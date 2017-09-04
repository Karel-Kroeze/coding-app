import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Hypothesis, Criterium } from './defs/hypotheses';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HypothesesService {
  constructor( private http: Http ) { }

  apiPath = "api";

  getHypothesis(): Promise<Hypothesis>{
      return this.http
        .get( "api/hypothesis" )
        .toPromise()
        .then( response => { 
            console.log( "response received", response.json() );
            return response.json().data as Hypothesis;
        }).catch( this.handleError );
  }

  update( hypothesis: Hypothesis, criteria: Criterium[], coder: string): Promise<boolean> {
      return this.http
        .post( "api/code", { hypothesis: hypothesis, criteria: criteria, coder: coder } )
        .toPromise()
        .then( response => {
            console.log( "update response received", response.json() );
            return response.json().status;
        });
  }

  getCodingStatus(): Promise<any> {
      return this.http
        .get( "api/status" )
        .toPromise()
        .then( response => {
            console.log( "status received", response.json() );
            return response.json();
        }).catch( this.handleError );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
