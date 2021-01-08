import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { User } from './user';
import { JwtResponse } from './jwt-response';
import { Pouzivatel } from '../data-model/pouzivatel';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    usersUrl = 'api/users';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    authSubject = new BehaviorSubject(false);

    constructor(
        private httpClient: HttpClient
    ) { }

    signIn(user: User, pouzivatel: Pouzivatel): Observable<JwtResponse> {
        return this.httpClient.post(this.usersUrl, user, this.httpOptions).pipe(
            tap(async (res: JwtResponse) => {
                if (res) {
                    localStorage.setItem('ACCESS_TOKEN', 'fake_acces_token');
                    localStorage.setItem('EXPIRES_IN', 'fake_expires_in');
                    localStorage.setItem('POUZIVATEL', JSON.stringify(pouzivatel));
                    localStorage.setItem('PREHLAD', 'list');
                    this.authSubject.next(true);
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('EXPIRES_IN');
        localStorage.removeItem('POUZIVATEL');
        localStorage.removeItem('PREHLAD');
        this.authSubject.next(false);
    }

    isAuthenticated(): boolean {
        // return this.authSubject.asObservable();
        return localStorage.getItem('ACCESS_TOKEN') !== null;
    }

    currentUser(): string {
        return (JSON.parse(localStorage.getItem('POUZIVATEL')) as Pouzivatel).priezvisko
            + ' ' + (JSON.parse(localStorage.getItem('POUZIVATEL')) as Pouzivatel).meno;
    }
}
