import { Component, OnInit } from '@angular/core';
import { MovieService } from './../../../../Services/movie.service';
import { Movie } from 'src/app/models/Movie';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ToastMessagesService } from 'src/app/Services/toast-messages.service';

@Component({
  selector: 'app-upcomingmovies',
  templateUrl: './upcomingmovies.component.html',
  styleUrls: ['./upcomingmovies.component.css']
})
export class UpcomingmoviesComponent implements OnInit {


  movies: any[] = [];
  str: string = "";
  moviePicture: any;
p:any;
  isLoading: boolean=true;
  noData: boolean=false;
  constructor(private movieService: MovieService,private toast :ToastMessagesService) {

  }

  ngOnInit(): void {


   
    this.loadMovies();

  }


  loadMovies() {
    this.movies.forEach((movie) => {

      console.log("movie ", movie.cast.length);

      for (let i = 0; i < movie.cast.length; i++) {
        i == 0 ? this.str += movie.cast[i] : this.str = this.str + "," + movie.cast[i]


      }


      console.log("--------------------------------", this.str);
    })

    this.movieService.getMovies().subscribe(res => {


      if (res.length > 0) {
        let response = res;
        this.movies = res;
        console.log("releaseDate", this.movies[0].releaseDate)
        console.log(typeof this.movies[0].releaseDate)
        this.isLoading=false;


        this.movies = this.movies.filter(movie => {
          return new Date(movie.releaseDate) > new Date()

        })
        console.log("movies", this.movies)
        for (let movie of this.movies) {
          if (movie.releaseDate <= new Date()) {
            console.log("Movie is in the past", movie.movieName)
          }
          else {
            console.log("Movie is in the future", movie.movieName)
          }
        }
        if (Array.isArray(response)) {
          console.log("--------------------------------", response)
        }
        console.log("response ", res)
        console.log(typeof res)
      }
      else {
        this.isLoading = false;
        this.noData = true;
      }
    })

  }


  deleteMovie(id: any) {
    console.log(id)
    // this.movieService.deleteMovieById(id);
    this.movieService.deleteMovieByMovieId(id).subscribe(res => {
      console.log(res)
      this.toast.showSuccess("Movie Deleted Successfully")
    },
    (err) => {
      this.toast.showError("Failed to Delete Movie");
    })
    this.loadMovies();
  }

}