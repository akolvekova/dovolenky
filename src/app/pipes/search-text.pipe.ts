import { Pipe, PipeTransform } from '@angular/core';
import { Dovolenka } from '../data-model/dovolenka';

@Pipe({
    name: 'searchText'
})
export class SearchTextPipe implements PipeTransform {

    transform(items: Dovolenka[], searchText: string): unknown {
        return items && searchText
            ? (
                items.filter(item => {
                    return (item.kod.toLowerCase().includes(searchText.toLowerCase())
                        || item.pouzivatel.priezvisko.toLowerCase().includes(searchText.toLowerCase())
                        || item.pouzivatel.meno.toLowerCase().includes(searchText.toLowerCase())
                        || (item.pouzivatel.priezvisko + ' ' + item.pouzivatel.meno).toLowerCase().includes(searchText.toLowerCase())
                        || item.schvalovatel.priezvisko.toLowerCase().includes(searchText.toLowerCase())
                        || item.schvalovatel.meno.toLowerCase().includes(searchText.toLowerCase())
                        || (item.schvalovatel.priezvisko + ' ' + item.schvalovatel.meno).toLowerCase().includes(searchText.toLowerCase())
                        || item.stav.toLowerCase().includes(searchText.toLowerCase())
                        || item.miesto.toLowerCase().includes(searchText.toLowerCase()));
                })
            ) : items;
    }

}
