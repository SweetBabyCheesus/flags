import { Component, OnInit, ViewChild } from '@angular/core';
import { countries, Country } from '../../../model/countries';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss'],
})
export class FlagsComponent implements OnInit {
  @ViewChild('singleSelect') singleSelect?: MatSelect;

  constructor() {}

  countries: Country[] = countries;

  countryCtrl: FormControl = new FormControl();
  countryFilterCtrl: UntypedFormControl = new FormControl();
  filteredCountries: ReplaySubject<Country[]> = new ReplaySubject<Country[]>(1);
  countryIsCorrect = false;
  countryIsWrong = false;

  capitalCtrl: FormControl = new FormControl();
  capitalFilterCtrl: UntypedFormControl = new FormControl();
  filteredCapitals: ReplaySubject<Country[]> = new ReplaySubject<Country[]>(1);
  capitalIsCorrect = false;
  capitalIsWrong = false;
  showFirework = false;

  currentCountry?: Country;

  srcUrl!: string;
  srcBaseUrl = 'https://flagcdn.com/w1280/';

  srcsetUrl!: string;
  srcsetBaseUrl = 'https://flagcdn.com/w2560/';

  displayNext = false;
  showButtons = true;

  protected _onDestroy = new Subject<void>();

  ngOnInit(): void {
    this.getFirstCountry();

    this.filteredCountries.next(this.countries.slice());
    this.filteredCapitals.next(this.countries.slice());

    this.countryFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCountries();
      });

    this.capitalFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCapitals();
      });
  }

  getFirstCountry() {
    this.currentCountry =
      countries[Math.floor(Math.random() * countries.length)];
    this.srcUrl = this.srcBaseUrl + this.currentCountry.abbreviation + '.png';
    this.srcsetUrl =
      this.srcsetBaseUrl + this.currentCountry.abbreviation + '.png 2x';
    this.countryCtrl.patchValue('');
    this.capitalCtrl.patchValue('');
  }

  protected setInitialValue() {
    this.filteredCountries
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        if (this.singleSelect)
          this.singleSelect.compareWith = (a: Country, b: Country) =>
            a && b && a.country === b.country;
      });

    this.filteredCapitals
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        if (this.singleSelect)
          this.singleSelect.compareWith = (a: Country, b: Country) =>
            a && b && a === b;
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  showNextButton() {
    setTimeout(() => {
      this.displayNext = true;
    }, 300);
  }

  protected filterCountries() {
    if (!this.countries) {
      return;
    }
    let search = this.countryFilterCtrl.value;
    if (!search) {
      this.filteredCountries.next(this.countries.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCountries.next(
      this.countries.filter(
        (countries) => countries.country.toLowerCase().indexOf(search) > -1
      )
    );
  }

  protected filterCapitals() {
    if (!this.countries) {
      return;
    }
    let search = this.capitalFilterCtrl.value;
    if (!search) {
      this.filteredCapitals.next(this.countries.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCapitals.next(
      this.countries.filter(
        (countries) => countries.capital.toLowerCase().indexOf(search) > -1
      )
    );
  }

  dontKnow() {
    if (this.currentCountry) {
      this.countryCtrl.patchValue(this.currentCountry);
      this.capitalCtrl.patchValue(this.currentCountry);
      this.showNextButton();
      this.showButtons = false;
      this.countryCtrl.disable();
      this.capitalCtrl.disable();
    }
  }

  submit() {
    this.showButtons = false;
    this.countryCtrl.disable();
    this.capitalCtrl.disable();

    if (
      this.countryCtrl.value &&
      this.countryCtrl.value.country === this.currentCountry?.country
    ) {
      this.countryIsCorrect = true;
      this.countryIsWrong = false;
    } else {
      this.countryIsCorrect = false;
      this.countryIsWrong = true;
    }

    if (
      this.capitalCtrl.value &&
      this.capitalCtrl.value.capital === this.currentCountry?.capital
    ) {
      this.capitalIsCorrect = true;
      this.capitalIsWrong = false;
    } else {
      this.capitalIsCorrect = false;
      this.capitalIsWrong = true;
    }

    if (
      this.countryCtrl.value &&
      this.countryCtrl.value.country === this.currentCountry?.country &&
      this.capitalCtrl.value &&
      this.capitalCtrl.value.capital === this.currentCountry?.capital
    ) {
      this.showFirework = true;
    }
    this.capitalCtrl.patchValue(this.currentCountry);
    this.countryCtrl.patchValue(this.currentCountry);
    this.showNextButton();
  }

  next() {
    this.displayNext = false;
    this.showButtons = true;
    this.countryCtrl.enable();
    this.capitalCtrl.enable();
    this.countryIsWrong = false;
    this.capitalIsWrong = false;
    this.countryIsCorrect = false;
    this.capitalIsCorrect = false;
    this.showFirework = false;
    this.countryCtrl.patchValue(undefined);
    this.countryFilterCtrl.patchValue(undefined);
    this.capitalCtrl.patchValue(undefined);
    this.capitalFilterCtrl.patchValue(undefined);
    this.getFirstCountry();
  }
}
