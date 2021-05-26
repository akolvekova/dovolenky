import { Component, OnInit } from '@angular/core';

import { Dovolenka } from '../../../data-model/dovolenka';

import { DovolenkaService } from '../../../services/dovolenka.service';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';
import { forkJoin } from 'rxjs';
import { CalendarOptions } from '@fullcalendar/core';
import { DovolenkaStav } from 'src/app/data-model/dovolenka-stav-enum';
import { DatePipe } from '@angular/common';
import { PouzivatelService } from 'src/app/services/pouzivatel.service';

@Component({
    selector: 'app-prehlad-list',
    templateUrl: './prehlad-list.component.html',
    styleUrls: ['./prehlad-list.component.scss']
})
export class PrehladListComponent implements OnInit {

    dovolenky: Dovolenka[] = [];
    dovolenkaFilter: Dovolenka = new Dovolenka();
    zoraditPodla: string;
    hladanyText: string;
    prehladList = localStorage.getItem('PREHLAD') === 'list';
    prehladCalendar = localStorage.getItem('PREHLAD') === 'calendar';
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
    calendar = false;

    constructor(
        private dovolenkaService: DovolenkaService,
        private pouzivatelService: PouzivatelService,
        private datepipe: DatePipe,
        private dateFormatPipe: DateFormatPipe
    ) { }

    ngOnInit(): void {
        const date = new Date();
        this.dovolenkaFilter = new Dovolenka();
        this.dovolenkaFilter.datumOd = this.dateFormatPipe.transform(new Date(date.getFullYear(), date.getMonth(), 1));
        this.dovolenkaFilter.datumDo = this.dateFormatPipe.transform(new Date(date.getFullYear(), date.getMonth() + 1, 0));
        this.getDovolenky();
    }

    getDovolenky(): void {
        forkJoin([
            this.dovolenkaService.getDovolenky(),
            this.pouzivatelService.getPouzivatelia()
        ]).subscribe(([d, p]) => {
            this.dovolenky = [];
            const events = [];
            d.forEach((item) => {
                let eventColor = '';
                switch (item.stav) {
                    case DovolenkaStav.NESPRACOVANA: eventColor = '#e67300'; break;
                    case DovolenkaStav.SCHVALENA: eventColor = '#28b62c'; break;
                    case DovolenkaStav.ZAMIETNUTA: eventColor = '#d50000'; break;
                    case DovolenkaStav.ZRUSENA: eventColor = '#000000'; break;
                    default: break;
                }
                for (const pItem of p) {
                    if (pItem.id === item.pouzivatelId) {
                        item.pouzivatel = pItem;
                        break;
                    }
                }
                for (const pItem of p) {
                    if (pItem.id === item.schvalovatelId) {
                        item.schvalovatel = pItem;
                        break;
                    }
                }
                this.dovolenky.push(item);
                events.push(
                    {
                        title: item.pouzivatel.priezvisko + ' ' + item.pouzivatel.meno,
                        start: this.datepipe.transform(item.datumOd, 'yyyy-MM-dd'),
                        end: this.datepipe.transform((new Date(item.datumDo).getTime() + 1000 * 3600 * 24), 'yyyy-MM-dd'),
                        color: eventColor
                    }
                );
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

    setPrehladList(): void {
        localStorage.setItem('PREHLAD', 'list');
        this.prehladList = true;
        this.prehladCalendar = false;
    }

    setPrehladCalendar(): void {
        localStorage.setItem('PREHLAD', 'calendar');
        this.prehladList = false;
        this.prehladCalendar = true;
    }

    setFilter(dovolenka: Dovolenka): void {
        this.dovolenkaFilter = dovolenka;
    }

    setZoraditPodla(zoraditPodla: string): void {
        this.zoraditPodla = zoraditPodla;
    }

    setHladanyText(hladanyText: string): void {
        this.hladanyText = hladanyText;
    }

}
