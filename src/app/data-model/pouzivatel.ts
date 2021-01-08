import { PouzivatelRola } from './pouzivatel-rola-enum';

export class Pouzivatel {
    public id: number;
    public login: string;
    public heslo: string;
    public priezvisko: string;
    public meno: string;
    public rola: PouzivatelRola;
    public predchadzajuca: number;
    public narok: number;

    constructor() { }
}
