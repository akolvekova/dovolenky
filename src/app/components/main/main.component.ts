import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';
import { SviatokService } from 'src/app/services/sviatok.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    constructor(
        public authGuard: AuthGuard,
        private sviatokService: SviatokService,
        private dateFormatPipe: DateFormatPipe
    ) { }

    ngOnInit(): void {
        localStorage.setItem('SVIATKY', '')
        this.sviatokService.getSviatky().subscribe(items => {
            items.forEach(item => {
                localStorage.setItem('SVIATKY', localStorage.getItem('SVIATKY') + this.dateFormatPipe.transform(item.datum) + ' ');
            });
        });
    }

}
