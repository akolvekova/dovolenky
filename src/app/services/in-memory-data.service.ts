import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../auth/user';
import { Dovolenka } from '../data-model/dovolenka';
import { Pouzivatel } from '../data-model/pouzivatel';
import { DovolenkaStav } from '../data-model/dovolenka-stav-enum';
import { PouzivatelRola } from '../data-model/pouzivatel-rola-enum';

@Injectable({
    providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
    createDb(): {} {
        const pouzivatelia: Pouzivatel[] = [
            {
                id: 1,
                login: 'JozkoS',
                heslo: 'JozkoS',
                priezvisko: 'Slivka',
                meno: 'Jozef',
                rola: PouzivatelRola.VEDUCI,
                predchadzajuca: 6,
                narok: 25
            },
            {
                id: 2,
                login: 'StanoC',
                heslo: 'StanoC',
                priezvisko: 'Čerešňa',
                meno: 'Stanislav',
                rola: PouzivatelRola.VEDUCI,
                predchadzajuca: 10,
                narok: 25
            },
            {
                id: 3,
                login: 'JankoE',
                heslo: 'JankoE',
                priezvisko: 'Egreš',
                meno: 'Ján',
                rola: PouzivatelRola.VEDUCI,
                predchadzajuca: 3,
                narok: 25
            },
            {
                id: 4,
                login: 'JankaSM',
                heslo: 'JankaSM',
                priezvisko: 'Svetlá Modrá ',
                meno: 'Jana',
                rola: PouzivatelRola.PRACOVNIK,
                predchadzajuca: 2,
                narok: 25
            },
            {
                id: 5,
                login: 'AdaC',
                heslo: 'AdaC',
                priezvisko: 'Červená',
                meno: 'Andrea',
                rola: PouzivatelRola.PRACOVNIK,
                predchadzajuca: 0,
                narok: 25
            },
            {
                id: 6,
                login: 'VladoH',
                heslo: 'VladoH',
                priezvisko: 'Hnedý',
                meno: 'Vladislav',
                rola: PouzivatelRola.PRACOVNIK,
                predchadzajuca: 2,
                narok: 25
            },
            {
                id: 7,
                login: 'JankaZ',
                heslo: 'JankaZ',
                priezvisko: 'Žltá',
                meno: 'Jana',
                rola: PouzivatelRola.PRACOVNIK,
                predchadzajuca: 3,
                narok: 25
            },
            {
                id: 8,
                login: 'StankaZ',
                heslo: 'StankaZ',
                priezvisko: 'Zelená',
                meno: 'Stanislava',
                rola: PouzivatelRola.PRACOVNIK,
                predchadzajuca: 1,
                narok: 25
            }
        ];

        const dovolenky: Dovolenka[] = [
            {
                id: 1,
                kod: '200708:5',
                pouzivatelId: 5,
                datumOd: new Date('2020-07-08'),
                datumDo: new Date('2020-07-10'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 2,
                kod: '200709:4',
                pouzivatelId: 4,
                datumOd: new Date('2020-07-09'),
                datumDo: new Date('2020-07-10'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 3,
                kod: '200713:6',
                pouzivatelId: 6,
                datumOd: new Date('2020-07-13'),
                datumDo: new Date('2020-07-17'),
                miesto: 'Prešov',
                schvalovatelId: 2,
                stav: DovolenkaStav.ZAMIETNUTA,
                poznamka: 'Dovod zamietnutia ..'
            },
            {
                id: 4,
                kod: '200715:7',
                pouzivatelId: 7,
                datumOd: new Date('2020-07-15'),
                datumDo: new Date('2020-07-15'),
                miesto: 'HU',
                schvalovatelId: 3,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 5,
                kod: '200805:5',
                pouzivatelId: 5,
                datumOd: new Date('2020-08-05'),
                datumDo: new Date('2020-08-07'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 6,
                kod: '200810:4',
                pouzivatelId: 4,
                datumOd: new Date('2020-08-10'),
                datumDo: new Date('2020-08-11'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 7,
                kod: '200817:6',
                pouzivatelId: 6,
                datumOd: new Date('2020-08-17'),
                datumDo: new Date('2020-08-21'),
                miesto: 'Prešov',
                schvalovatelId: 2,
                stav: DovolenkaStav.ZAMIETNUTA,
                poznamka: 'Dovod zamietnutia ..'
            },
            {
                id: 8,
                kod: '200818:7',
                pouzivatelId: 7,
                datumOd: new Date('2020-08-18'),
                datumDo: new Date('2020-08-18'),
                miesto: 'HU',
                schvalovatelId: 3,
                stav: DovolenkaStav.ZRUSENA,
                poznamka: null
            },
            {
                id: 9,
                kod: '200824:2',
                pouzivatelId: 1,
                datumOd: new Date('2020-08-24'),
                datumDo: new Date('2020-08-24'),
                miesto: 'HU',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 10,
                kod: '200902:6',
                pouzivatelId: 6,
                datumOd: new Date('2020-09-02'),
                datumDo: new Date('2020-09-04'),
                miesto: 'Prešov',
                schvalovatelId: 2,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 11,
                kod: '200914:5',
                pouzivatelId: 5,
                datumOd: new Date('2020-09-14'),
                datumDo: new Date('2020-09-14'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 12,
                kod: '200914:4',
                pouzivatelId: 4,
                datumOd: new Date('2020-09-14'),
                datumDo: new Date('2020-09-14'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.ZRUSENA,
                poznamka: '... nejaky dovod zrusenia ...'
            },
            {
                id: 13,
                kod: '200916:7',
                pouzivatelId: 7,
                datumOd: new Date('2020-09-16'),
                datumDo: new Date('2020-09-16'),
                miesto: 'Ke',
                schvalovatelId: 3,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 14,
                kod: '200918:5',
                pouzivatelId: 5,
                datumOd: new Date('2020-09-18'),
                datumDo: new Date('2020-09-18'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 15,
                kod: '200930:5',
                pouzivatelId: 5,
                datumOd: new Date('2020-09-30'),
                datumDo: new Date('2020-09-30'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 16,
                kod: '201005:5',
                pouzivatelId: 5,
                datumOd: new Date('2020-10-05'),
                datumDo: new Date('2020-10-05'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 17,
                kod: '201009:8',
                pouzivatelId: 8,
                datumOd: new Date('2020-10-09'),
                datumDo: new Date('2020-10-09'),
                miesto: 'Kežmarok',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 18,
                kod: '201012:5',
                pouzivatelId: 5,
                datumOd: new Date('2020-10-12'),
                datumDo: new Date('2020-10-16'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.NESPRACOVANA,
                poznamka: null
            },
            {
                id: 19,
                kod: '201012:7',
                pouzivatelId: 7,
                datumOd: new Date('2020-10-12'),
                datumDo: new Date('2020-10-14'),
                miesto: 'Ke',
                schvalovatelId: 3,
                stav: DovolenkaStav.NESPRACOVANA,
                poznamka: null
            },
            {
                id: 20,
                kod: '201016:2',
                pouzivatelId: 1,
                datumOd: new Date('2020-10-16'),
                datumDo: new Date('2020-10-16'),
                miesto: 'HU',
                schvalovatelId: 1,
                stav: DovolenkaStav.NESPRACOVANA,
                poznamka: null
            },
            {
                id: 21,
                kod: '201016:6',
                pouzivatelId: 6,
                datumOd: new Date('2020-10-16'),
                datumDo: new Date('2020-10-19'),
                miesto: 'Prešov',
                schvalovatelId: 2,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 22,
                kod: '201102:5',
                pouzivatelId: 5,
                datumOd: new Date('2020-11-02'),
                datumDo: new Date('2020-11-03'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 23,
                kod: '201102:7',
                pouzivatelId: 7,
                datumOd: new Date('2020-11-02'),
                datumDo: new Date('2020-11-03'),
                miesto: 'KE',
                schvalovatelId: 3,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 24,
                kod: '201223:1',
                pouzivatelId: 1,
                datumOd: new Date('2020-12-23'),
                datumDo: new Date('2020-12-23'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 25,
                kod: '201223:2',
                pouzivatelId: 2,
                datumOd: new Date('2020-12-23'),
                datumDo: new Date('2020-12-23'),
                miesto: 'KE',
                schvalovatelId: 2,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 26,
                kod: '201223:3',
                pouzivatelId: 3,
                datumOd: new Date('2020-12-23'),
                datumDo: new Date('2020-12-23'),
                miesto: 'KE',
                schvalovatelId: 3,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 27,
                kod: '201223:4',
                pouzivatelId: 4,
                datumOd: new Date('2020-12-23'),
                datumDo: new Date('2020-12-23'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 28,
                kod: '201223:5',
                pouzivatelId: 5,
                datumOd: new Date('2020-12-23'),
                datumDo: new Date('2020-12-23'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 29,
                kod: '201223:6',
                pouzivatelId: 6,
                datumOd: new Date('2020-12-23'),
                datumDo: new Date('2020-12-23'),
                miesto: 'KE',
                schvalovatelId: 2,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 30,
                kod: '201223:7',
                pouzivatelId: 7,
                datumOd: new Date('2020-12-23'),
                datumDo: new Date('2020-12-23'),
                miesto: 'KE',
                schvalovatelId: 3,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 31,
                kod: '201223:8',
                pouzivatelId: 8,
                datumOd: new Date('2020-12-23'),
                datumDo: new Date('2020-12-23'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 32,
                kod: '201230:1',
                pouzivatelId: 1,
                datumOd: new Date('2020-12-30'),
                datumDo: new Date('2020-12-31'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 33,
                kod: '201230:2',
                pouzivatelId: 2,
                datumOd: new Date('2020-12-30'),
                datumDo: new Date('2020-12-31'),
                miesto: 'KE',
                schvalovatelId: 2,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 34,
                kod: '201230:3',
                pouzivatelId: 3,
                datumOd: new Date('2020-12-30'),
                datumDo: new Date('2020-12-31'),
                miesto: 'KE',
                schvalovatelId: 3,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 35,
                kod: '201230:4',
                pouzivatelId: 4,
                datumOd: new Date('2020-12-30'),
                datumDo: new Date('2020-12-31'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 36,
                kod: '201230:5',
                pouzivatelId: 5,
                datumOd: new Date('2020-12-30'),
                datumDo: new Date('2020-12-31'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 37,
                kod: '201230:6',
                pouzivatelId: 6,
                datumOd: new Date('2020-12-30'),
                datumDo: new Date('2020-12-31'),
                miesto: 'KE',
                schvalovatelId: 2,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 38,
                kod: '201228:7',
                pouzivatelId: 7,
                datumOd: new Date('2020-12-28'),
                datumDo: new Date('2020-12-31'),
                miesto: 'KE',
                schvalovatelId: 3,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 39,
                kod: '201228:8',
                pouzivatelId: 8,
                datumOd: new Date('2020-12-28'),
                datumDo: new Date('2020-12-31'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 40,
                kod: '210104:8',
                pouzivatelId: 7,
                datumOd: new Date('2021-01-04'),
                datumDo: new Date('2021-01-05'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 41,
                kod: '210104:8',
                pouzivatelId: 8,
                datumOd: new Date('2021-01-04'),
                datumDo: new Date('2021-01-05'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 42,
                kod: '210201:1',
                pouzivatelId: 1,
                datumOd: new Date('2021-02-01'),
                datumDo: new Date('2021-02-01'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 43,
                kod: '210205:3',
                pouzivatelId: 3,
                datumOd: new Date('2021-02-05'),
                datumDo: new Date('2021-02-05'),
                miesto: 'KE',
                schvalovatelId: 3,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 44,
                kod: '210208:4',
                pouzivatelId: 4,
                datumOd: new Date('2021-02-08'),
                datumDo: new Date('2021-02-09'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.SCHVALENA,
                poznamka: null
            },
            {
                id: 45,
                kod: '210222:8',
                pouzivatelId: 8,
                datumOd: new Date('2021-02-22'),
                datumDo: new Date('2021-02-26'),
                miesto: 'KE',
                schvalovatelId: 1,
                stav: DovolenkaStav.NESPRACOVANA,
                poznamka: null
            }
        ];

        const users: User[] = [
        ];

        return { dovolenky, pouzivatelia, users };
    }

    genId(dovolenky: Dovolenka[]): number {
        return dovolenky.length > 0 ? Math.max(...dovolenky.map(dovolenka => dovolenka.id)) + 1 : 1;
    }

}
