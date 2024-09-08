import { Injectable } from '@angular/core';
import { Movie } from '../models/Movie';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';


@Injectable({
  providedIn: 'root'
})
export class MovieService {


  moviesKey:string='movies'
  constructor(private http:HttpClient) { }

  baseUrl: string = "https://localhost:7025/api/Movies";



  // getMovies()
  // {
  //   this.http.get()

  //   )
  // }


  getMovies() {
    return this.http.get<any[]>(this.baseUrl +'/getAllmovies');
  }


  addNewMovie(movie:Movie)
  {
    return this.http.post(this.baseUrl + '/addNewMovie', movie, {
      responseType: 'json'
    })

  }

  deleteMovieByMovieId(id:any)
  {
    return this.http.delete(this.baseUrl + '/deleteMovieByMovieId' + id);


  }

  updateMovieByMovieId(movieId: any, updatedMovieDetails: any)
  {

    console.log("updateMovieByMovieId............")
    return this.http.put(this.baseUrl + '/updateMovieByMovieId/' + movieId,
      updatedMovieDetails
    );
  }


  getMovieDetailsByMovieId(movieId:any)
  {
    return this.http.get(this.baseUrl + "/getMovieDetailsByMovieId/" + movieId)
  }

  getAllMovies():Movie[]
  {
    let movieslit = this.http.get('https://localhost:7025/api/Movies');
   
    console.log("movieslit", movieslit);
    this.http.get('https://localhost:7025/api/Movies').subscribe((response) => {
      console.log("movies", response);
      
    })

    
  
  let movies=  localStorage.getItem('movies')
    return movies ? JSON.parse(movies) : [];

  }

  addMovie(movie:any)
  {
    let existingMovies = this.getAllMovies();
    const movieExists = existingMovies.some(m => m.movieId == movie || m.movieName==movie.movieName);
    if (!movieExists) {
      existingMovies.push(movie);
      localStorage.setItem('movies', JSON.stringify(existingMovies));
      alert('Movie added successfully');
    }
    else {
      alert('Movie already exists');
    }

 
  }


  UpdateMoveById(id:any,updatedMovieDetails:any)
  {
    console.log(id)
    console.log(updatedMovieDetails)
    let movies = this.getAllMovies();


    const movieIndex = movies.findIndex(movie => movie.movieId === id);
    if (movieIndex !== -1) {
      movies[movieIndex] = { ...movies[movieIndex], ...updatedMovieDetails }
      localStorage.setItem('movies', JSON.stringify(movies));
      alert('movie updated Sucessfully')

    }

  
    
  }

  deleteMovieById(id: any) {
    let movies = this.getAllMovies()
    
    movies = movies.filter(m => m.movieId !== id);
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  getMovieDetailsById(id:any):any
  {
    console.log(id)

    let movies = this.getAllMovies();
    
    let movie = movies.find(m => m.movieId === id);
    return movie;
  }
}


// const existingUsers = this.getUsersFromStorage();
// const userExists = existingUsers.some(u => u.email === user.email);
// if (!userExists) {
//   existingUsers.push(user);
//   localStorage.setItem(this.storageKey, JSON.stringify(existingUsers));
// } else {
//   console.error('User already exists');
// }