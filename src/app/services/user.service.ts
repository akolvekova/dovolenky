import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MessageService } from './message.service';
import { User } from '../auth/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private usersUrl = 'api/users';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl)
            .pipe(
                // tap(_ => this.log('fetched users')),
                catchError(this.handleError<User[]>('getUsers', []))
            );
    }

    private log(message: string): void {
        this.messageService.add(`UserService: ${message}`);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}

