import { Component, OnInit, Input } from '@angular/core';
import { HypothesesService } from '../hypotheses.service';
import { Hypothesis, Criterium } from '../defs/hypotheses';
import { StatusComponent } from '../status/status.component';
import {HostListener} from '@angular/core';

@Component({
    selector: 'app-coding',
    templateUrl: './coding.component.html',
    styleUrls: ['./coding.component.css']
})
export class CodingComponent implements OnInit {

    constructor( private hypothesesService: HypothesesService ) { }

    hypothesis: Hypothesis;
    criteria: Criterium[];
    @Input() status: StatusComponent;
    savePending: boolean = true;

    toggle( criterium: Criterium ): void {
        criterium.result = !criterium.result;
    }
        
    @HostListener('window:keydown', ['$event'])
    keyboardInput(event: KeyboardEvent): void {
        // if enter, call saveAndContinue
        if ( event.key == "Enter" )
            return this.saveAndContinue();

        // otherwise, loop over our criteria to see if the key matches any criterium.
        for ( let criterium of this.criteria )
            if ( event.key === criterium.key )
                return this.toggle( criterium );
        
        // well, that was about it...
        console.log( "No binding for KeyoardEvent;", event );
    }

    saveAndContinue(){
        this.savePending = true;
        this.hypothesesService.update( this.hypothesis, this.criteria, this.status.coder )
            .then( res => {
                if (res) {
                    this.getNextHypothesis() // getNext succeeding also clears savePending
                } else {
                    console.log( "Something went wrong while saving" )
                }
            }).catch( err => {
                console.log( "Something went wrong while saving;", err.message );
            });
    }

    ngOnInit() {
        this.getNextHypothesis();
    }

    getNextHypothesis(): void {
        this.hypothesesService.getHypothesis().then( res => {
            this.hypothesis = res;
            setTimeout( () => { this.savePending = false; }, 500 );
        }); 
        this.criteria = [
            new Criterium("Variables", "q"),
            new Criterium("Modifier", "w"),
            new Criterium("Syntax", "e"),
            new Criterium("manipulation", "r"),
            new Criterium("qualified", "t"),
            new Criterium("CVS", "y")
        ];
        this.status.update();
    }

}
