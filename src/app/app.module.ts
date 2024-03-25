import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlagsComponent } from './components/flags/flags.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule } from '@angular/material/form-field';
//import { MatSelectModule, MatOptionModule } from '@angular/material';

@NgModule({
  declarations: [AppComponent, FlagsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    NgxMatSelectSearchModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
