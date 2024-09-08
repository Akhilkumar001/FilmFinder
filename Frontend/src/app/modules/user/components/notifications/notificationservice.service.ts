import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationserviceService {

  constructor() { }

  request()
  {
    if('Notification' in window)
    {
      Notification.requestPermission().then(permission=>
      {
        if(Notification.permission=="granted")
        {
          console.log("granted")
        }
        else
        {
          console.log("denied")
        }
      }
      )
    }
  }
sendNotifications(title:string, options?:NotificationOptions)
  {
  
if(Notification.permission=="granted")
{
  new Notification(title,options)
}
}
}
