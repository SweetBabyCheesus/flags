
import { Component, OnInit } from '@angular/core';
import {countries} from './../../../assets/countries'

@Component({
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss'],
})
export class FlagsComponent implements OnInit {

  constructor() {}
  countries = countries;

  srcUrl = 'https://flagcdn.com/w1280/de.png';
  srcsetUrl = 'https://flagcdn.com/w2560/de.png 2x';


  ngOnInit(): void {
    console.log(countries)
  }

  gn() {
    console.log('uf');
  }
}




