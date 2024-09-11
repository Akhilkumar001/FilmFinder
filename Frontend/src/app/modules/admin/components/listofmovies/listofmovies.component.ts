import { Component, OnInit } from '@angular/core';
import { MovieService } from './../../../../Services/movie.service';
import { Movie } from 'src/app/models/Movie';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ToastMessagesService } from 'src/app/Services/toast-messages.service';

@Component({
  selector: 'app-listofmovies',
  templateUrl: './listofmovies.component.html',
  styleUrls: ['./listofmovies.component.css']
})
export class ListofmoviesComponent implements OnInit {

  movies: any[] = [];
  str:string="";
  moviePicture: any;
  isLoading:boolean=true;
  noData:boolean=false;
p:any;
  constructor(private toast : ToastMessagesService, private movieService: MovieService) {
    
  }

  ngOnInit(): void {
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
      if(res.length > 0)
      {
        let response = res;
        this.movies = res;
        if (Array.isArray(response)) {
          console.log("--------------------------------", response)
        }
        console.log("response ", res)
        console.log(typeof res)
        this.movies = this.movies.filter(movie => {
          return new Date(movie.releaseDate) <= new Date()
    
        })
        this.isLoading=false;
      }
      else{
        this.isLoading=false;
        this.noData=true;
      }
     
    })

  }


  deleteMovie(id: any) {
    console.log(id)
    // this.movieService.deleteMovieById(id);
    this.movieService.deleteMovieByMovieId(id).subscribe((res)=>{
      console.log(res)
      this.toast.showSuccess("Movie Deleted Successfully")
    },
    (err) => {
      this.toast.showError("Failed to Delete Movie");
    })
    this.loadMovies();
  }

}