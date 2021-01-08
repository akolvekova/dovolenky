import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';

import { MessageService } from './message.service';
import { Dovolenka } from '../data-model/dovolenka';
import { DateFormatPipe } from '../pipes/date-format.pipe';

@Injectable({
    providedIn: 'root'
})
export class DovolenkaService {

    private dovolenkyUrl = 'api/dovolenky';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private dateFormatPipe: DateFormatPipe,
        private messageService: MessageService
    ) { }

    getDovolenky(): Observable<Dovolenka[]> {
        return this.http.get<Dovolenka[]>(this.dovolenkyUrl)
            .pipe(
                // tap(_ => this.log('fetched dovolenky')),
                catchError(this.handleError<Dovolenka[]>('getDovolenky', []))
            );
    }

    getDovolenka(id: number): Observable<Dovolenka> {
        const url = `${this.dovolenkyUrl}/${id}`;
        return this.http.get<Dovolenka>(url)
            .pipe(
                // tap(_ => this.log(`fetched dovolenky id=${id}`)),
                catchError(this.handleError<Dovolenka>(`getDovolenka id=${id}`))
            );
    }

    addDovolenka(dovolenka: Dovolenka): Observable<Dovolenka> {
        return this.http.post<Dovolenka>(this.dovolenkyUrl, dovolenka, this.httpOptions)
            .pipe(
                // tap((newDovolenka: Dovolenka) => this.log(`added dovolenka w/ id=${newDovolenka.id}`)),
                catchError(this.handleError<Dovolenka>('addDovolenka'))
            );
    }

    updateDovolenka(dovolenka: Dovolenka): Observable<any> {
        return this.http.put(this.dovolenkyUrl, dovolenka, this.httpOptions)
            .pipe(
                // tap(_ => this.log(`updated dovolenka id=${dovolenka.id}`)),
                catchError(this.handleError<any>('updateDovolenka'))
            );
    }

    getDays(datumOd: Date, datumDo: Date): number {
        let numWorkDays = 0;
        const firstDate = this.dateFormatPipe.transform(datumOd);
        const lastDate = this.dateFormatPipe.transform(datumDo);
        let currentDate = firstDate;
        while (currentDate <= lastDate) {
            if (new Date(currentDate).getDay() !== 0 && new Date(currentDate).getDay() !== 6) {
                numWorkDays++;
            }
            currentDate = this.dateFormatPipe.transform(new Date(new Date(currentDate).getTime() + 1000 * 3600 * 24));
        }
        return numWorkDays;
    }

    private log(message: string): void {
        this.messageService.add(`DovolenkaService: ${message}`);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for dovolenka consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}
