import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IHypothesis, ICodeResult } from '@golab/adaptive-hypotheses';

import 'rxjs/add/operator/toPromise';
import { Criterium } from './coding/criterium.class';

@Injectable()
export class HypothesesService {
  constructor( private http: Http ) { }

  apiPath = "api";

  getHypothesis( coder: string ): Promise<IHypothesis>{
      return this.http
        .get( "api/hypothesis/" + coder )
        .toPromise()
        .then( response => { 
            console.log( "response received", response.json() );
            return response.json().data as IHypothesis;
        }).catch( this.handleError );
  }

  update( hypothesis: IHypothesis, criteria: Criterium[], coder: string): Promise<boolean> {
      let code: ICodeResult = {
          coder: coder,
          results: criteria
      }
      return this.http
        .post( "api/code", { hypothesis: hypothesis, code: code } )
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
