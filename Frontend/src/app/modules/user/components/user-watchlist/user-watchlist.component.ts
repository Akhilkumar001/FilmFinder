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
  isLoading:boolean=true;
  noData:boolean=false;
  p:any;
  constructor(private watchlistserv:WatchlistService,private a:AuthService,private movieservice:MovieService){
    // this.currentuser=this.a.getLogge
  }
  ngOnInit(): void {
    
    this.loadWatchlist();
   

   
  }
  deleteWatchlistById(id:any){
    console.log(id)
    this.watchlistserv.deleteWatchlistByMovieId(id).subscribe(res=>{
      alert("Deleted successfully")
      this.movieIds=this.movieIds.filter(m=>m.movieId!=id)
      this.loadWatchlist()
      
      
    })}
    loadWatchlist(){
      this.currentuser="66dca3b5cb1dc966999e7717"
    this.watchlistserv.getWatchListDetailesByUserId(this.currentuser).subscribe(res=>{
     
      this.watchList=res
      this.movieservice.getMovies().subscribe(res=>{
        if(res.length>0){

        
        this.movies=res
        for(let i=0;i<this.movies.length;i++){
        
          for(let j=0;j<this.watchList.length;j++){
          
            if(this.watchList[j].movieId==this.movies[i].movieId){
              this.movieIds.push(this.movies[i])

            }
            
          }

        }
        this.isLoading=false
        console.log('this.movieIds',this.movieIds)}
        else{
          this.isLoading=false;
          this.noData=true;
        }
       
      })
    
    })
    }
}