import { Component, OnInit, Input } from '@angular/core';
import { Dovolenka } from '../../../../data-model/dovolenka';
import { DovolenkaStav } from '../../../../data-model/dovolenka-stav-enum';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';
import { DovolenkaService } from 'src/app/services/dovolenka.service';

@Component({
    selector: 'app-prehlad-item',
    templateUrl: './prehlad-item.component.html',
    styleUrls: ['./prehlad-item.component.scss']
})
export class PrehladItemComponent implements OnInit {

    @Input() dovolenka: Dovolenka;
    stav = DovolenkaStav;
    buttonUpravy = false;
    // upravy = false;

    constructor(
        private dateFormatPipe: DateFormatPipe,
        private dovolenkaService: DovolenkaService
    ) { }

    ngOnInit(): void {
        const date = new Date();
        this.buttonUpravy = this.dovolenka.datumOd >= this.dateFormatPipe.transform(new Date(date.getFullYear(), date.getMonth(), 1));
    }

    getDays(): number {
        return this.dovolenkaService.getDays(this.dovolenka.datumOd, this.dovolenka.datumDo);
    }

}
