import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Dovolenka } from '../../../../../data-model/dovolenka';
import { Pouzivatel } from '../../../../../data-model/pouzivatel';
import { DovolenkaStav } from '../../../../../data-model/dovolenka-stav-enum';

import { PouzivatelService } from '../../../../../services/pouzivatel.service';
import { DovolenkaService } from '../../../../../services/dovolenka.service';
import { PouzivatelRola } from 'src/app/data-model/pouzivatel-rola-enum';

@Component({
    selector: 'app-item-form',
    templateUrl: './item-form.component.html',
    styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

    @Input() dovolenka: Dovolenka;
    @Output() povoleneUpravy = new EventEmitter<boolean>();
    dovolenkaForm: Dovolenka = new Dovolenka();
    prihlasenyVeduci = false;
    schvalovatelia: Array<Pouzivatel>;
    stavyList: DovolenkaStav[] = Object.values(DovolenkaStav)
    submitted = false;
    
    constructor(
        private pouzivatelService: PouzivatelService,
        private dovolenkaService: DovolenkaService,
        public datepipe: DatePipe) {
    }

    ngOnInit(): void {
        this.prihlasenyVeduci = (JSON.parse(localStorage.getItem('POUZIVATEL')) as Pouzivatel).rola === PouzivatelRola.VEDUCI;
        this.pouzivatelService.getSchvalovatelia()
            .subscribe(items => this.schvalovatelia = items);
        this.dovolenkaToDovolenkaForm();
    }

    onSubmit(): void {
        this.dovolenkaFormToDovolenka();
        // this.save();
        this.submitted = true;
        this.povoleneUpravy.emit(false);
    }

    save(): void {
        this.dovolenkaService.updateDovolenka(this.dovolenka)
            .subscribe(() => { });
    }

    private dovolenkaToDovolenkaForm(): void {
        this.dovolenkaForm.datumOd = this.dovolenka.datumOd;
        this.dovolenkaForm.datumDo = this.dovolenka.datumDo;
        this.dovolenkaForm.miesto = this.dovolenka.miesto;
        this.dovolenkaForm.schvalovatel = this.dovolenka.schvalovatel;
        this.dovolenkaForm.schvalovatelId = this.dovolenka.schvalovatel.id;
        this.dovolenkaForm.poznamka = this.dovolenka.poznamka;
        this.dovolenkaForm.stav = this.dovolenka.stav;
    }

    private dovolenkaFormToDovolenka(): void {
        this.dovolenka.datumOd = this.dovolenkaForm.datumOd;
        this.dovolenka.datumDo = this.dovolenkaForm.datumDo;
        this.dovolenka.miesto = this.dovolenkaForm.miesto;
        this.dovolenka.poznamka = this.dovolenkaForm.poznamka;
        this.dovolenka.stav = this.dovolenkaForm.stav;
        this.dovolenka.kod = this.datepipe.transform(this.dovolenka.datumOd, 'yyMMdd') + ':' + this.dovolenka.pouzivatelId;
        this.pouzivatelService.getPouzivatel(this.dovolenkaForm.schvalovatelId)
            .subscribe(pouzivatel => {
                this.dovolenka.schvalovatel = pouzivatel;
                this.save();
            });
    }

}
