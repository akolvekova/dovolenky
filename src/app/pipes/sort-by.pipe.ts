import { Pipe, PipeTransform } from '@angular/core';
import { Dovolenka } from '../data-model/dovolenka';
import { Pouzivatel } from '../data-model/pouzivatel';

@Pipe({
    name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

    transform(items: any[], sortBy: string): any {
        if (items) {
            switch (sortBy) {
                case 'Kód': {
                    return items.sort((a, b) => {
                        return (a.kod < b.kod) ? -1 : 1;
                    });
                    break;
                }
                case 'Meno': {
                    return items.sort((a, b) => {
                        return (a.pouzivatel.priezvisko + a.pouzivatel.meno)
                            .localeCompare(b.pouzivatel.priezvisko + b.pouzivatel.meno);
                    });
                    break;
                }
                case 'pouzivatel.meno': {
                    return items.sort((a, b) => {
                        return (a.priezvisko + a.meno)
                            .localeCompare(b.priezvisko + b.meno);
                    });
                    break;
                }
                case 'Termín': {
                    return items.sort((a, b) => {
                        return (a.datumOd < b.datumOd) ? -1 : 1;
                    });
                    break;
                }
                case 'Schvaľuje': {
                    return items.sort((a, b) => {
                        return (a.schvalovatel.priezvisko + a.schvalovatel.meno)
                            .localeCompare(b.schvalovatel.priezvisko + b.schvalovatel.meno);
                    });
                    break;
                }
                case 'Stav': {
                    return items.sort((a, b) => {
                        return (a.stav < b.stav) ? -1 : 1;
                    });
                    break;
                }
                default: {
                    return items.sort((a, b) => {
                        return (a.id < b.id) ? -1 : 1;
                    });
                    break;
                }
            }
        }
    }

}
