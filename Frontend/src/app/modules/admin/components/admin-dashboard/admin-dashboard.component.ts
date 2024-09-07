import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MovieService } from './../../../../Services/movie.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  movies: any[] = []
  casting: any;
  genres: any;

constructor(private  movieService:MovieService) {
  
} 
  ngOnInit(): void {

    this.movies = this.movieService.getAllMovies();

      
  }
}


// cast: Array["Prabhas", "Deepika"]

// directorName: "Nagashwin"

// genre: Array["Scifi", "Mythology"]

// movieId: "d4b8ec77-a00a-473a-84a8-56406b0eb058"

// movieName: "Kalki"

// releaseDate: "2024-06-27"

// synopsis: "The future of those in the dystopian city of Kasi is altered when the destined arrival of Lord Vishnu's final avatar launches a war against darkness."