import { Component, OnInit } from '@angular/core';
import { countries } from '../../countries';

@Component({
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss'],
})
export class FlagsComponent implements OnInit {
  constructor() {}

  srcUrl = 'https://flagcdn.com/w1280/de.png';
  srcsetUrl = 'https://flagcdn.com/w2560/de.png 2x';

  countries = countries;

  ngOnInit(): void {
    console.log(countries)
  }

  gn() {
    console.log('uf');
  }
}
