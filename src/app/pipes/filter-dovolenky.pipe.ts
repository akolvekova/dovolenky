import { Pipe, PipeTransform } from '@angular/core';
import { Dovolenka } from '../data-model/dovolenka';
import { DateFormatPipe } from './date-format.pipe';
import { Pouzivatel } from '../data-model/pouzivatel';
import { PouzivatelRola } from '../data-model/pouzivatel-rola-enum';

@Pipe({
    name: 'filterDovolenky',
    pure: false
})
export class FilterDovolenkyPipe implements PipeTransform {

    constructor(
        private dateFormatPipe: DateFormatPipe
    ) { }

    transform(items: Dovolenka[], dovolenkaFilter: Dovolenka): any {
        return items && dovolenkaFilter
            ? items.filter(item =>
                ((JSON.parse(localStorage.getItem('POUZIVATEL')) as Pouzivatel).rola === PouzivatelRola.PRACOVNIK
                     ? (JSON.parse(localStorage.getItem('POUZIVATEL')) as Pouzivatel).id === item.pouzivatelId : true)
                && (dovolenkaFilter.datumOd
                    ? this.dateFormatPipe.transform(item.datumDo) >= dovolenkaFilter.datumOd : true)
                && (dovolenkaFilter.datumDo
                    ? this.dateFormatPipe.transform(item.datumOd) <= dovolenkaFilter.datumDo : true)
                && (dovolenkaFilter.pouzivatel ? item.pouzivatel.id === dovolenkaFilter.pouzivatel.id : true)
                && (dovolenkaFilter.schvalovatel ? item.schvalovatel.id === dovolenkaFilter.schvalovatel.id : true)
                && (dovolenkaFilter.stavy ? dovolenkaFilter.stavy.indexOf(item.stav) > -1 : true))
            : items;
    }

}
