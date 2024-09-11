import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/Services/movie.service';
import { WatchlistService } from 'src/app/Services/watchlist.service';
import { Watchlist } from 'src/app/models/watchlist';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css']
})
export class UserHomepageComponent implements OnInit{
  selectedMovie:any
  currentUser:any
  constructor(private a: AuthService, private router: Router, private movieservice:MovieService, private watchlistservice:WatchlistService) { }
  searchQuery: string = '';
  
  movies:any[]=[]
  isLoading: boolean=true;
  noData: boolean=false;

  mainMovie = {
    title: 'Main Movie Title',
    imdbRating: '8.5',
    cast: 'Actor 1, Actor 2, Actor 3',
    releaseDate: '2024-09-01',
    image: 'assets/images/main-movie.jpg'
  };
  p:any;

  
  filteredMovies:any[]=[]
 
  searchMovie() {
  if (this.searchQuery.trim()) {
    this.filteredMovies = this.movies.filter(movie =>
      movie.movieName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  } else {
    this.filteredMovies = [...this.movies];
  }
}
ngOnInit() {
  this.loadMovies();
 

 
}
loadMovies(){
  this.movieservice.getMovies().subscribe(res => {
    if(res.length>0){
      this.movies = res;
    this.filteredMovies = [...this.movies];
    this.watchlistservice.getAllWatchlist().subscribe(res=>{
    
    })
    this.filteredMovies = this.filteredMovies.filter(movie => {
      return new Date(movie.releaseDate) <= new Date()

    })
    this.isLoading=false;
    }
    else{
      this.isLoading=false;
      this.noData=true;
    }
    
    
 });

}

AddWatchlist(movieId:any){
  this.movieservice.getMovieDetailsByMovieId(movieId).subscribe(res => {
    this.selectedMovie = res;
    this.currentUser = this.a.getLoggedInUser();
    console.log(this.currentUser);
    const watchlist:Watchlist = {
      watchlistId: "66e0173c5d73003ecc74b75a",
    movieId: this.selectedMovie.movieId,
    movieName: this.selectedMovie.movieName,
    uid: "66dca3b5cb1dc966999e7717",
    userName: this.currentUser.firstName+" "+this.currentUser.lastName,
    userEmail: this.currentUser.email,
    isAddedToWatchlist: true
    } 

    this.watchlistservice.addWatchlist(watchlist).subscribe(res => {
      console.log(res)
      if(res!="failedToAddWatchList"){
      alert("Added to Watchlist successfully")
      }
      
    },
    error=>{
      alert("movie already Added To Watchlist")
    }
  )
    
   })
  
}

navigateToMovieInfo() {
  this.router.navigate(['/user-movieinfo']);
}

}