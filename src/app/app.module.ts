import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService } from './services/in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrehladListComponent } from './components/main/prehlad/prehlad-list.component';
import { PrehladItemComponent } from './components/main/prehlad/prehlad-item/prehlad-item.component';
import { NovaFormComponent } from './components/main/nova-form/nova-form.component';
import { MainComponent } from './components/main/main.component';
import { StavListComponent } from './components/main/stav/stav-list.component';
import { StavItemComponent } from './components/main/stav/stav-item/stav-item.component';
import { NotFoundComponent } from './components/main/not-found/not-found.component';
import { DovolenkaService } from './services/dovolenka.service';
import { PouzivatelService } from './services/pouzivatel.service';
import { SviatokService } from './services/sviatok.service';
import { ExcelExportService } from './services/excel-export.service';
import { MessagesComponent } from './components/main/messages/messages.component';
import { ItemFormComponent } from './components/main/prehlad/prehlad-item/item-form/item-form.component';
import { PrehladFilterComponent } from './components/main/prehlad/prehlad-filter/prehlad-filter.component';
import { FilterDovolenkyPipe } from './pipes/filter-dovolenky.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { SearchTextPipe } from './pipes/search-text.pipe';

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    interactionPlugin
]);

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NavbarComponent,
        PrehladListComponent,
        PrehladItemComponent,
        NovaFormComponent,
        MainComponent,
        StavListComponent,
        StavItemComponent,
        NotFoundComponent,
        MessagesComponent,
        ItemFormComponent,
        PrehladFilterComponent,
        FilterDovolenkyPipe,
        DateFormatPipe,
        SortByPipe,
        FooterComponent,
        SearchTextPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        FullCalendarModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, { dataEncapsulation: false }
        )

    ],
    providers: [
        DatePipe,
        DateFormatPipe,
        DovolenkaService,
        PouzivatelService,
        SviatokService,
        ExcelExportService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
