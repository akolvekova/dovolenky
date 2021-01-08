import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Pouzivatel } from 'src/app/data-model/pouzivatel';
import { PouzivatelService } from 'src/app/services/pouzivatel.service';
import { DovolenkaStav } from 'src/app/data-model/dovolenka-stav-enum';
import { StavInterface } from 'src/app/data-model/stav-interface';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';
import { Dovolenka } from 'src/app/data-model/dovolenka';

@Component({
    selector: 'app-prehlad-filter',
    templateUrl: './prehlad-filter.component.html',
    styleUrls: ['./prehlad-filter.component.scss']
})
export class PrehladFilterComponent implements OnInit {

    @Output() dovolenkaFilterEmitter = new EventEmitter<Dovolenka>();
    @Output() sortByEmitter = new EventEmitter<string>();
    @Output() searchTextEmitter = new EventEmitter<string>();

    dovolenkaFilter: Dovolenka = new Dovolenka();
    pouzivatelia: Array<Pouzivatel>;
    schvalovatelia: Array<Pouzivatel>;
    stavyList: DovolenkaStav[] = Object.values(DovolenkaStav);
    stavyListI: StavInterface[] = [];
    filter = false;
    sortBy = 'Kód';
    searchText = '';
    datumPreObdobie = new Date();
    obdobieLong = '';

    constructor(
        private pouzivatelService: PouzivatelService,
        private dateFormatPipe: DateFormatPipe
    ) { }

    ngOnInit(): void {
        this.obdobieLong = this.datumPreObdobie.toLocaleString('default', { month: 'long' }) + ' ' + this.datumPreObdobie.getFullYear();

        const date = new Date();
        this.dovolenkaFilter.datumOd = this.dateFormatPipe.transform(new Date(date.getFullYear(), date.getMonth(), 1));
        this.dovolenkaFilter.datumDo = this.dateFormatPipe.transform(new Date(date.getFullYear(), date.getMonth() + 1, 0));

        this.pouzivatelService.getPouzivatelia()
            .subscribe(items => this.pouzivatelia = items);

        this.pouzivatelService.getSchvalovatelia()
            .subscribe(items => this.schvalovatelia = items);

        this.dovolenkaFilter.stavy = this.stavyList;
        this.stavyList.forEach(item => {
            const stavI = {
                stav: item,
                checked: true
            };
            this.stavyListI.push(stavI);
        });
    }

    obdobiePred(): void {
        this.datumPreObdobie.setMonth(this.datumPreObdobie.getMonth() - 1);
        this.obdobieLong = this.datumPreObdobie.toLocaleString('default', { month: 'long' }) + ' ' + this.datumPreObdobie.getFullYear();
        this.dovolenkaFilter.datumOd =
            this.dateFormatPipe.transform(new Date(this.datumPreObdobie.getFullYear(), this.datumPreObdobie.getMonth(), 1));
        this.dovolenkaFilter.datumDo =
            this.dateFormatPipe.transform(new Date(this.datumPreObdobie.getFullYear(), this.datumPreObdobie.getMonth() + 1, 0));
    }

    obdobiePo(): void {
        this.datumPreObdobie.setMonth(this.datumPreObdobie.getMonth() + 1);
        this.obdobieLong = this.datumPreObdobie.toLocaleString('default', { month: 'long' }) + ' ' + this.datumPreObdobie.getFullYear();
        this.dovolenkaFilter.datumOd =
            this.dateFormatPipe.transform(new Date(this.datumPreObdobie.getFullYear(), this.datumPreObdobie.getMonth(), 1));
        this.dovolenkaFilter.datumDo =
            this.dateFormatPipe.transform(new Date(this.datumPreObdobie.getFullYear(), this.datumPreObdobie.getMonth() + 1, 0));
    }

    filtrovat(): void {
        this.filter = (this.filter ? false : true);
    }

    changeFilter(): void {
        this.dovolenkaFilterEmitter.emit(this.dovolenkaFilter);
    }

    changeStav(): void {
        this.dovolenkaFilter.stavy = [];
        this.stavyListI.forEach(item => {
            if (item.checked) {
                this.dovolenkaFilter.stavy.push(item.stav);
            }
        });
        this.dovolenkaFilterEmitter.emit(this.dovolenkaFilter);
    }

    changeSortBy(): void {
        this.sortByEmitter.emit(this.sortBy);
    }

    changeSearchText(): void {
        this.searchTextEmitter.emit(this.searchText);
    }

}
