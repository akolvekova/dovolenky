import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { PrehladListComponent } from './components/main/prehlad/prehlad-list.component';
import { NovaFormComponent } from './components/main/nova-form/nova-form.component';
import { StavListComponent } from './components/main/stav/stav-list.component';
import { NotFoundComponent } from './components/main/not-found/not-found.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'prehlad', component: PrehladListComponent, canActivate: [AuthGuard] },
    { path: 'nova', component: NovaFormComponent, canActivate: [AuthGuard] },
    { path: 'stav', component: StavListComponent, canActivate: [AuthGuard] },
    //{ path: '**', component: NotFoundComponent }
    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
