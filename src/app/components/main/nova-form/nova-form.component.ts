import { Component, OnInit } from '@angular/core';
import { Dovolenka } from '../../../data-model/dovolenka';
import { Pouzivatel } from '../../../data-model/pouzivatel';
import { PouzivatelService } from '../../../services/pouzivatel.service';
import { DovolenkaService } from '../../../services/dovolenka.service';
import { DatePipe } from '@angular/common';
import { DovolenkaStav } from '../../../data-model/dovolenka-stav-enum';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
    selector: 'app-nova-form',
    templateUrl: './nova-form.component.html',
    styleUrls: ['./nova-form.component.scss']
})
export class NovaFormComponent implements OnInit {

    nova: Dovolenka = new Dovolenka();
    today = new Date().toJSON().split('T')[0];
    schvalovatelia: Array<Pouzivatel>;
    submitted = false;
    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        locale: 'sk',
        firstDay: 1,
        height: 'auto',
        aspectRatio: 3,
        fixedWeekCount: false,
        headerToolbar: {
            start: 'prev',
            center: 'title',
            end: 'next'
        },
        dayMaxEvents: true,
        // dayHeaderClassNames: 'myclassname',
        showNonCurrentDates: false
    };

    constructor(
        private pouzivatelService: PouzivatelService,
        private dovolenkaService: DovolenkaService,
        public datepipe: DatePipe) {
    }

    ngOnInit(): void {
        this.getDovolenky();
    }

    getDovolenky(): void {
        const pouzivatel = JSON.parse(localStorage.getItem('POUZIVATEL')) as Pouzivatel;
        this.nova.pouzivatelId = pouzivatel.id;
        this.pouzivatelService.getSchvalovatelia()
            .subscribe(items => this.schvalovatelia = items);
        this.dovolenkaService.getDovolenky()
            .subscribe(items => {
                const events = [];
                items.forEach(item => {
                    if (item.pouzivatelId === pouzivatel.id) {
                        let eventColor = '';
                        switch (item.stav) {
                            case DovolenkaStav.NESPRACOVANA: eventColor = '#e67300'; break;
                            case DovolenkaStav.SCHVALENA: eventColor = '#28b62c'; break;
                            case DovolenkaStav.ZAMIETNUTA: eventColor = '#d50000'; break;
                            case DovolenkaStav.ZRUSENA: eventColor = '#000000'; break;
                            default: break;
                        }
                        events.push(
                            {
                                title: pouzivatel.priezvisko,
                                start: this.datepipe.transform(item.datumOd, 'yyyy-MM-dd'),
                                end: this.datepipe.transform((new Date(item.datumDo).getTime() + 1000 * 3600 * 24), 'yyyy-MM-dd'),
                                color: eventColor
                            }
                        );
                    }
                });
                localStorage.getItem('SVIATKY').split(' ').forEach(item => {
                    events.push(
                        {
                            start: this.datepipe.transform(item, 'yyyy-MM-dd'),
                            end: this.datepipe.transform(item, 'yyyy-MM-dd'),
                            display: 'background'
                        }
                    );
                });
                this.calendarOptions.events = events;
            });
    }

    onSubmit(): void {
        this.nova.kod = this.datepipe.transform(this.nova.datumOd, 'yyMMdd') + ':' + this.nova.pouzivatelId;
        this.nova.stav = DovolenkaStav.NESPRACOVANA;
        this.add(this.nova);
        this.submitted = true;
    }

    add(nova: Dovolenka): void {
        if (!nova) { return; }
        this.dovolenkaService.addDovolenka(nova)
            .subscribe(dovolenka => { });
    }

}
