import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Sviatok } from '../data-model/sviatok';
import { DateFormatPipe } from '../pipes/date-format.pipe';

@Injectable({
    providedIn: 'root'
})
export class SviatokService {

    private sviatkyUrl = 'api/sviatky';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private dateFormatPipe: DateFormatPipe
    ) { }

    getSviatky(): Observable<Sviatok[]> {
        return this.http.get<Sviatok[]>(this.sviatkyUrl)
            .pipe(
                // tap(_ => this.log('fetched sviatky')),
                catchError(this.handleError<Sviatok[]>('getSviatky', []))
            );
    }

    isSviatok(datum: Date): boolean {
        return datum != null && localStorage.getItem('SVIATKY').includes(this.dateFormatPipe.transform(datum));
    }

    private log(message: string): void {
        this.messageService.add(`SviatokService: ${message}`);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for sviatok consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}
