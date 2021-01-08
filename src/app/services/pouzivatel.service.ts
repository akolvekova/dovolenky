import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Pouzivatel } from '../data-model/pouzivatel';
import { User } from '../auth/user';
import { PouzivatelRola } from '../data-model/pouzivatel-rola-enum';

@Injectable({
    providedIn: 'root'
})
export class PouzivatelService {

    private pouzivateliaUrl = 'api/pouzivatelia';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) { }

    getPouzivatelia(): Observable<Pouzivatel[]> {
        return this.http.get<Pouzivatel[]>(this.pouzivateliaUrl)
            .pipe(
                // tap(_ => this.log('fetched pouzivatelia')),
                catchError(this.handleError<Pouzivatel[]>('getPouzivatelia', []))
            );
    }

    // getPouzivateliaMap(): Observable<number, Pouzivatel[]> {
    //     return this.http.get<Pouzivatel[]>(this.pouzivateliaUrl)
    //         .pipe(
    //             map
    //             // tap(_ => this.log('fetched pouzivatelia')),
    //             catchError(this.handleError<Pouzivatel[]>('getPouzivatelia', []))
    //         );
    // }

    getSchvalovatelia(): Observable<Pouzivatel[]> {
        const term = PouzivatelRola.VEDUCI;
        if (!term.trim()) {
            return of([]);
        }
        const url = `${this.pouzivateliaUrl}/?rola=${term}`;
        return this.http.get<Pouzivatel[]>(url)
            .pipe(
                // tap(x => x.length ?
                //    this.log(`found pouzivatelia matching "${term}"`) :
                //    this.log(`no pouzivatelia matching "${term}"`)),
                catchError(this.handleError<Pouzivatel[]>('getSchvalovatelia', []))
            );
    }

    getPouzivatel(id: number): Observable<Pouzivatel> {
        const url = `${this.pouzivateliaUrl}/${id}`;
        return this.http.get<Pouzivatel>(url)
            .pipe(
                // tap(_ => this.log(`fetched pouzivatelia id=${id}`)),
                catchError(this.handleError<Pouzivatel>(`getPouzivatel id=${id}`))
            );
    }

    getPouzivatelPrihlasenie(user: User): Observable<Pouzivatel[]> {
        if (!user.login.trim() || !user.heslo.trim()) {
            return of();
        }

        // const url = `${this.pouzivateliaUrl}/?login=${login}&heslo=${heslo}`;
        const url = `${this.pouzivateliaUrl}?login=${user.login}&heslo=${user.heslo}`;
        console.log(url);
        return this.http.get<Pouzivatel[]>(url)
            .pipe(
                // tap(_ => this.log(`fetched pouzivatelia id=${id}`)),
                catchError(this.handleError<Pouzivatel[]>(`getPouzivatelPrihlasenie login=${user.login}, heslo=${user.heslo}`))
            );
    }

    addPouzivatel(pouzivatel: Pouzivatel): Observable<Pouzivatel> {
        return this.http.post<Pouzivatel>(this.pouzivateliaUrl, pouzivatel, this.httpOptions)
            .pipe(
                // tap((newpouzivatel: Pouzivatel) => this.log(`added pouzivatel w/ id=${newPouzivatel.id}`)),
                catchError(this.handleError<Pouzivatel>('addPouzivatel'))
            );
    }

    private log(message: string): void {
        this.messageService.add(`PouzivatelService: ${message}`);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for pouzivatel consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}
