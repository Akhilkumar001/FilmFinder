import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/Services/movie.service';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css']
})
export class UserHomepageComponent implements OnInit{
  constructor(private a: AuthService, private router: Router, private movieservice:MovieService) { }
  searchQuery: string = '';
  
  movies:any[]=[]
  mainMovie = {
    title: 'Main Movie Title',
    imdbRating: '8.5',
    cast: 'Actor 1, Actor 2, Actor 3',
    releaseDate: '2024-09-01',
    image: 'assets/images/main-movie.jpg'
  };

  // movies = [
  //   {
  //     title: 'Movie Title 1',
  //     imdbRating: '7.5',
  //     image: 'assets/images/movie1.jpg'
  //   },
  //   {
  //     title: 'Movie Title 2',
  //     imdbRating: '8.0',
  //     image: 'assets/images/movie2.jpg'
  //   },
  //   {
  //     title: 'Movie Title 3',
  //     imdbRating: '9.0',
  //     image: 'assets/images/movie3.jpg'
  //   }
  // ];

  // movies: Array<{ id: number, title: string, rating: number, cast: string[], releaseDate: string, imageUrl: string }> = [
  //   { id: 1, title: 'Inception', rating: 8.8, cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'], releaseDate: '2010-07-16', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg' },
  //   { id: 2, title: 'Interstellar', rating: 8.6, cast: ['Matthew McConaughey', 'Anne Hathaway'], releaseDate: '2014-11-07', imageUrl: 'FilmFinder\src\assets\images\image2.jpg' },
  //   { id: 3, title: 'The Dark Knight', rating: 9.0, cast: ['Christian Bale', 'Heath Ledger'], releaseDate: '2008-07-18', imageUrl: 'assets\images\image3.jpg' },
  //   { id: 4, title: 'The Matrix', rating: 8.7, cast: ['Keanu Reeves', 'Laurence Fishburne'], releaseDate: '1999-03-31', imageUrl: 'assets\images\image4.jpg' },
  //   { id: 5, title: 'Pulp Fiction', rating: 8.9, cast: ['John Travolta', 'Uma Thurman'], releaseDate: '1994-10-14', imageUrl: 'assets\images\image5.jpg' },
  //   { id: 6, title: 'Fight Club', rating: 8.8, cast: ['Brad Pitt', 'Edward Norton'], releaseDate: '1999-10-15', imageUrl: 'assets\images\image6.jpg' },
  //   { id: 7, title: 'The Shawshank Redemption', rating: 9.3, cast: ['Tim Robbins', 'Morgan Freeman'], releaseDate: '1994-09-23', imageUrl: 'assets\images\image7.jpg' },
  //   { id: 8, title: 'The Godfather', rating: 9.2, cast: ['Marlon Brando', 'Al Pacino'], releaseDate: '1972-03-24', imageUrl: 'assets\images\image8.jpg' },
  //   { id: 9, title: 'The Lord of the Rings: The Return of the King', rating: 8.9, cast: ['Elijah Wood', 'Viggo Mortensen'], releaseDate: '2003-12-17', imageUrl: 'assets\images\image9.jpg' },
  //   { id: 10, title: 'Forrest Gump', rating: 8.8, cast: ['Tom Hanks', 'Robin Wright'], releaseDate: '1994-07-06', imageUrl: 'assets\images\image10.jpg' }
  // ];
  
  
  filteredMovies: Array<{ id: number, title: string, rating: number, cast: string[], releaseDate: string, imageUrl: string }> = [...this.movies];  // Initially, display all movies
  
 
  searchMovie() {
  if (this.searchQuery.trim()) {
    this.filteredMovies = this.movies.filter(movie =>
      movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  } else {
    // If the search query is empty, show all movies
    this.filteredMovies = [...this.movies];
  }
}
ngOnInit() {
  this.movies=this.movieservice.getAllMovies();

}
navigateToMovieInfo() {
  this.router.navigate(['/user-movieinfo']);
}


  // searchMovie() {
  //   console.log('Searching for:', this.searchQuery);
  //   // Implement the search logic here
  // }


}
