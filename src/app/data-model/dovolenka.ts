import { DovolenkaStav } from './dovolenka-stav-enum';
import { Pouzivatel } from './pouzivatel';

export class Dovolenka {

    public id: number;
    public kod: string;
    public pouzivatelId: number;
    public datumOd: Date;
    public datumDo: Date;
    public miesto: string;
    public schvalovatelId: number;
    public stav: DovolenkaStav;
    public poznamka?: string;

    public pouzivatel?: Pouzivatel;
    public schvalovatel?: Pouzivatel;
    public stavy?: DovolenkaStav[];

    constructor() { }
}
