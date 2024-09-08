import { Component,OnInit } from '@angular/core';
import { NotificationserviceService } from './notificationservice.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [DatePipe] 
})
export class NotificationsComponent implements OnInit {
  date:Date=new Date();
  currentDate:any;
  currentTime:any;
  releaseDates: any=[];
interval:any;
  constructor(private notificationService:NotificationserviceService,private datepipe:DatePipe )
  {

  }
ngOnInit()
{

this.releaseDates = JSON.parse(localStorage.getItem("movies") || "[]");
this.currentDate=this.date.getFullYear()+"-"+(this.date.getMonth() + 1).toString().padStart(2, '0') + "-" +this.date.getDate().toString().padStart(2, '0');
this.currentTime=this.datepipe.transform(this.date, 'hh:mm:ss a');
if("08:34:00 PM"=== this.currentTime)
{
  this.interval=setTimeout(()=>
    {
      this.checkDate(this.releaseDates);
    },1000)  
}

}
ngOnDestroy()
{
  if(this.interval)
  {
    clearInterval(this.interval)
  }
}
checkDate(releaseDates: { releaseDate: any; movieName: any; }[])
{
  releaseDates.forEach((movie: { releaseDate: any; movieName: any; }) => {
    if (movie.releaseDate === this.currentDate) {
       this.sendNotifications(movie.movieName)
       this.ngOnDestroy();
    }
  });
}
sendNotifications(movieName: any)
{
  this.notificationService.sendNotifications("movieName",{
    body: movieName
  })
}
}
