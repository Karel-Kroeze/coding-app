import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HypothesesService } from '../hypotheses.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor( 
    private hypothesesService: HypothesesService
  ) { }

  status: any;
  coder: string;
  checkedIn: boolean = false;

  get summary(): string {
    return `${( this.status.one + this.status.multiple )}/${this.status.total} (${this.percent(this.status.total, this.status.one + this.status.multiple )}) completed.`;
  }

  get percentMultiple() {
    return this.percent( this.status.total, this.status.multiple ); 
  }

  get percentOne() {
    return this.percent( this.status.total, this.status.one );
  }

  get widthMultiple() {
    return {
      width: this.percentMultiple
    }
  }

  get widthOne() {
    return {
      width: this.percentOne
    }
  }

  percent( total: number, part: number ) {
      return Math.round( part / total * 1000 ) / 10 + "%";
  }

  ngOnInit() {
      this.update();
  }

  update(){
      this.hypothesesService.getCodingStatus()
          .then( res => this.status = res );
  }

  checkIn(){
      console.log( `Checking in ${this.coder}`);
      if (this.coder && this.coder !== ""){
          this.checkedIn = true;
      } else {
          alert( `"${this.coder}" is not a valid name` );
      }
  }

}
