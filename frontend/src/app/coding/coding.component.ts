import { Component, OnInit, Input } from '@angular/core';
import { HypothesesService } from '../hypotheses.service';
import { StatusComponent } from '../status/status.component';
import { HostListener } from '@angular/core';
import { Criterium } from './criterium.class';
import { IHypothesis } from '@golab/adaptive-hypotheses';

@Component({
    selector: 'app-coding',
    templateUrl: './coding.component.html',
    styleUrls: ['./coding.component.css']
})
export class CodingComponent implements OnInit {
    constructor( private hypothesesService: HypothesesService ) { }
    hypothesis: IHypothesis;
    criteria: Criterium[];
    @Input() status: StatusComponent;
    savePending = true;

    @HostListener('window:keydown', ['$event'])
    keyboardInput(event: KeyboardEvent): void {
        // if enter, call saveAndContinue
        if ( event.key === 'Enter' ) {
            return this.saveAndContinue();
        }

        // otherwise, loop over our criteria to see if the key matches any criterium.
        for ( const criterium of this.criteria ) {
            if ( event.key === criterium.key ) {
                return criterium.toggle();
            }
        }

        // well, that was about it...
        console.log( 'No binding for KeyoardEvent;', event );
    }

    saveAndContinue() {
        if (this.savePending) {
            return;
        }

        this.savePending = true;
        this.hypothesesService.update( this.hypothesis, this.criteria, this.status.coder )
            .then( res => {
                if (res) {
                    this.getNextHypothesis(); // getNext succeeding also clears savePending
                } else {
                    console.log( 'Something went wrong while saving' );
                }
            }).catch( err => {
                console.log( 'Something went wrong while saving;', err.message );
            });
    }

    ngOnInit() {
        this.getNextHypothesis();
    }

    getNextHypothesis(): void {
        this.hypothesesService.getHypothesis( this.status.coder ).then( res => {
            this.hypothesis = res;
            setTimeout( () => { this.savePending = false; }, 500 );
        });

        // parser criteria
        const manipulationCriterium = new Criterium('manipulation', 'r', null, 'Manipulation' );
        const qualifiedCriterium = new Criterium('qualified', 't', null, 'Qualified' );
        const CVSCriterium = new Criterium('CVS', 'y' );
        const SyntaxCriterium = new Criterium('Syntax', 'e', [manipulationCriterium, qualifiedCriterium, CVSCriterium]);
        const VariablesCriterium = new Criterium('VariablesPresent', 'q', [SyntaxCriterium], 'Variables' );
        const ModifierCriterium = new Criterium('ModifiersPresent', 'w', [manipulationCriterium], 'Modifiers' );

        this.criteria = [
            VariablesCriterium,
            ModifierCriterium,
            SyntaxCriterium,
            manipulationCriterium,
            qualifiedCriterium,
            CVSCriterium
        ];
        this.status.update();
    }
}
