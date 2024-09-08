import { Component, OnInit } from '@angular/core';
import { MovieService } from './../../../../Services/movie.service';
import { Movie } from 'src/app/models/Movie';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listofmovies',
  templateUrl: './listofmovies.component.html',
  styleUrls: ['./listofmovies.component.css']
})
export class ListofmoviesComponent implements OnInit {

  movies: any[] = [];
  str:string="";
  moviePicture: any;

  constructor(private movieService: MovieService) {
    
  }

  ngOnInit(): void {
      

    // this.movies = this.movieService.getAllMovies();
    // console.log(this.movies)
    // console.log(this.movies.length)
    this.loadMovies();
    
  }


  loadMovies()
  {
    this.movies.forEach((movie) => {

      console.log("movie ", movie.cast.length);

      for (let i = 0; i < movie.cast.length; i++) {
        i == 0 ? this.str += movie.cast[i] : this.str = this.str + "," + movie.cast[i]


      }


      console.log("--------------------------------", this.str);
    })

    this.movieService.getMovies().subscribe(res => {

      let response = res;
      this.movies = res;
      if (Array.isArray(response)) {
        console.log("--------------------------------", response)
      }
      console.log("response ", res)
      console.log(typeof res)
    })

  }


  deleteMovie(id: any) {
    console.log(id)
    // this.movieService.deleteMovieById(id);
    this.movieService.deleteMovieByMovieId(id).subscribe(res=>{
      console.log(res)
      alert("Movie deleted successfully :)")
    })
    this.loadMovies();
  }




}
