import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {

constructor()
{

}

  appName: string = "Film Finder "




  textColorDark: string = 'text-dark';
  textColorWhite: string = 'text-white';
  isDarkMode: boolean = true;

  logoStyles: Record<string, string> = {
    color: 'white',
    fontSize: '24px',
    fontWeight: '500'
  }

  ngOnInit() {

  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.isDarkMode ? this.logoStyles['color'] = 'white' : this.logoStyles['color'] = 'black';

  }

}
