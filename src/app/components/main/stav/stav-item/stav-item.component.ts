import { Component, OnInit, Input } from '@angular/core';
import { Zaznam } from 'src/app/data-model/zaznam';

@Component({
    selector: 'app-stav-item',
    templateUrl: './stav-item.component.html',
    styleUrls: ['./stav-item.component.scss']
})
export class StavItemComponent implements OnInit {
    @Input() zaznam: Zaznam;
    @Input() isAktRok: boolean;

    aktMesiac = (new Date()).getMonth() + 1;

    constructor() { }

    ngOnInit(): void {
    }

}
