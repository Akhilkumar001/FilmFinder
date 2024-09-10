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
  this.movieservice.getMovies().subscribe(res => {
    this.movies = res;
    this.filteredMovies = [...this.movies];

    
 });
 
}

AddWatchlist(movieId:any){
  this.movieservice.getMovieDetailsByMovieId(movieId).subscribe(res => {
    this.selectedMovie = res;
    this.currentUser = this.a.getLoggedInUser();
    console.log(this.currentUser);
    const watchlist:Watchlist = {
      movieId:movieId,
    movieName: this.selectedMovie.movieName,
    userId: this.currentUser.uid,
    userName: this.currentUser.firstName+" "+this.currentUser.lastName,
    userEmail: this.currentUser.email,
    watchlistId:"",
    isAddedToWatchlist:true
    } 

    this.watchlistservice.addWatchlist(watchlist).subscribe(res => {
      alert("Added to Watchlist successfully")
    })
    
   })
  
}

navigateToMovieInfo() {
  this.router.navigate(['/user-movieinfo']);
}

  


}
