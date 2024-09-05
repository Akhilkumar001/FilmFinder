import { Injectable } from '@angular/core';
import { Movie } from '../models/Movie';


@Injectable({
  providedIn: 'root'
})
export class MovieService {


  moviesKey:string='movies'
  constructor() { }





  getAllMovies():Movie[]
  {

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