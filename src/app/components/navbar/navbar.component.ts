import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(
        public authService: AuthService,
        public authGuard: AuthGuard,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    logout(): void {
        this.authService.logout();
        this.router.navigateByUrl('/login');
    }

}
