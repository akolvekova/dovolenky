import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DovolenkaService } from 'src/app/services/dovolenka.service';
import { PouzivatelService } from 'src/app/services/pouzivatel.service';
import { ExcelExportService } from 'src/app/services/excel-export.service';
import { Zaznam } from 'src/app/data-model/zaznam';
import { Dovolenka } from 'src/app/data-model/dovolenka';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';
import { DovolenkaStav } from 'src/app/data-model/dovolenka-stav-enum';

@Component({
    selector: 'app-stav-list',
    templateUrl: './stav-list.component.html',
    styleUrls: ['./stav-list.component.scss']
})
export class StavListComponent implements OnInit {

    zaznamy: Zaznam[] = [];
    rok = (new Date()).getFullYear();
    isAktRok = true;
    dovolenkaFilter: Dovolenka = new Dovolenka();

    constructor(
        private pouzivatelService: PouzivatelService,
        private dovolenkaService: DovolenkaService,
        private excelExportService: ExcelExportService,
        private dateFormatPipe: DateFormatPipe
    ) { }

    ngOnInit(): void {
        this.setFilter();
        this.getZaznamy();
    }

    getZaznamy(): void {
        this.zaznamy = [];
        forkJoin([
            this.pouzivatelService.getPouzivatelia(),
            this.dovolenkaService.getDovolenky()
        ]).subscribe(([p, d]) => {
            p.sort((a, b) => {
                return (a.priezvisko + a.meno).localeCompare(b.priezvisko + b.meno);
            }).forEach(pouzivatelItem => {
                const zaznam = new Zaznam();
                zaznam.pouzivatel = pouzivatelItem;
                d.filter(dovolenkaItem => (dovolenkaItem.pouzivatelId === pouzivatelItem.id
                    && this.dateFormatPipe.transform(dovolenkaItem.datumOd) >= this.dovolenkaFilter.datumOd
                    && this.dateFormatPipe.transform(dovolenkaItem.datumDo) <= this.dovolenkaFilter.datumDo
                    && dovolenkaItem.stav == DovolenkaStav.SCHVALENA))
                    .forEach(dovolenkaItem => {
                        const days = this.dovolenkaService.getDays(dovolenkaItem.datumOd, dovolenkaItem.datumDo);
                        switch (new Date(dovolenkaItem.datumOd).getMonth()) {
                            case 0: zaznam.mesiac01 += days; break;
                            case 1: zaznam.mesiac02 += days; break;
                            case 2: zaznam.mesiac03 += days; break;
                            case 3: zaznam.mesiac04 += days; break;
                            case 4: zaznam.mesiac05 += days; break;
                            case 5: zaznam.mesiac06 += days; break;
                            case 6: zaznam.mesiac07 += days; break;
                            case 7: zaznam.mesiac08 += days; break;
                            case 8: zaznam.mesiac09 += days; break;
                            case 9: zaznam.mesiac10 += days; break;
                            case 10: zaznam.mesiac11 += days; break;
                            case 11: zaznam.mesiac12 += days; break;
                            default: break;
                        }
                    });
                zaznam.zostatok = zaznam.pouzivatel.predchadzajuca + zaznam.pouzivatel.narok - (
                    zaznam.mesiac01 + zaznam.mesiac02 + zaznam.mesiac03 + zaznam.mesiac04 +
                    zaznam.mesiac05 + zaznam.mesiac06 + zaznam.mesiac07 + zaznam.mesiac08 +
                    zaznam.mesiac09 + zaznam.mesiac10 + zaznam.mesiac11 + zaznam.mesiac12);
                this.zaznamy.push(zaznam);
            });
        });
    }

    rokPred(): void {
        this.rok = this.rok - 1;
        this.setFilter();
        this.getZaznamy();
    }

    rokPo(): void {
        this.rok = this.rok + 1;
        this.setFilter();
        this.getZaznamy();
    }

    setFilter(): void {
        this.dovolenkaFilter.datumOd = this.dateFormatPipe.transform(new Date(this.rok, 0, 1));
        this.dovolenkaFilter.datumDo = this.dateFormatPipe.transform(new Date(this.rok, 11, 31));
        this.isAktRok = (this.rok === (new Date()).getFullYear() ? true : false);
    }

    exportAsXLSX(): void {
        this.excelExportService.exportAsExcelFile(this.zaznamy, 'dovolenky_');
    }
}
