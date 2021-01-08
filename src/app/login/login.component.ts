import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pouzivatel } from '../data-model/pouzivatel';
import { PouzivatelService } from '../services/pouzivatel.service';
import { AuthService } from '../auth/auth.service';
import { runInThisContext } from 'vm';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    authForm: FormGroup;
    isSubmitted = false;
    pouzivatelia: Array<Pouzivatel>;
    pouzivatel = new Pouzivatel();
    valid = true;

    constructor(
        private authService: AuthService,
        private pouzivatelService: PouzivatelService,
        private router: Router,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.authForm = this.formBuilder.group({
            login: ['', Validators.required],
            heslo: ['', Validators.required]
        });
        this.pouzivatelService.getPouzivatelia()
            .subscribe(items => this.pouzivatelia = items);
    }

    get formControls() { return this.authForm.controls; }

    signIn(): void {
        this.isSubmitted = true;

        if (this.authForm.invalid) {
            return;
        }

        this.pouzivatelService.getPouzivatelPrihlasenie(this.authForm.value)
            .subscribe(items => {
                if (items.length === 1) {
                    this.pouzivatelService.getPouzivatel(items[0].id)
                        .subscribe(item => {
                            if (item.login === Object.values(this.authForm.value)[0]
                                && item.heslo === Object.values(this.authForm.value)[1]) {
                                this.authService.signIn(this.authForm.value, item).subscribe(() => {
                                    this.valid = true;
                                    this.router.navigateByUrl('/prehlad');
                                });
                            } else {
                                this.valid = false;
                            }
                        });
                } else {
                    this.valid = false;
                }
            });
    }

    copyText(text: string) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = text;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        
        this.authForm.patchValue({
            login: text,
            heslo: text
        });
    }

}
