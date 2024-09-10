import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { MovieService } from 'src/app/Services/movie.service';
import { WatchlistService } from 'src/app/Services/watchlist.service';

@Component({
  selector: 'app-user-watchlist',
  templateUrl: './user-watchlist.component.html',
  styleUrls: ['./user-watchlist.component.css']
})
export class UserWatchlistComponent  implements OnInit{
  currentuser:any
  watchList:any[]=[]
  movies:any[]=[]
  movieIds:any[]=[]
  constructor(private watchlistserv:WatchlistService,private a:AuthService,private movieservice:MovieService){
    // this.currentuser=this.a.getLogge
  }
  ngOnInit(): void {
    
    this.currentuser="66dca3b5cb1dc966999e7717"
    this.watchlistserv.getWatchListDetailesByUserId(this.currentuser).subscribe(res=>{
     
      this.watchList=res
      this.movieservice.getMovies().subscribe(res=>{
        this.movies=res
        for(let i=0;i<this.movies.length;i++){
        
          for(let j=0;j<this.watchList.length;j++){
          
            console.log(this.watchList[j].movieId==this.movies[i].movieId)
          }

          
        }
       
      })
    
    })
   

   
  }

 

}
