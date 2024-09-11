import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  appName: string = "Film Finder "

constructor(private router:ActivatedRoute)
{

}
  

  textColorDark: string = 'text-dark';
  textColorWhite: string = 'text-white';
  isDarkMode: boolean = true;

  logoStyles: Record<string, string> = {
    color: 'white',
    fontSize: '24px',
    fontWeight: '500',
    textDecoration:'none'
  }

  ngOnInit() {
 
  }
  
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.isDarkMode ? this.logoStyles['color'] = 'white' : this.logoStyles['color'] = 'black';

  }

}