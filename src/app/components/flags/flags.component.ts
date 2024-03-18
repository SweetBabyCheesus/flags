import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss']
})
export class FlagsComponent implements OnInit {

  constructor() { }

  srcUrl = "https://flagcdn.com/w1280/de.png"
  srcsetUrl = "https://flagcdn.com/w2560/de.png 2x"

  ngOnInit(): void {

  }

}
