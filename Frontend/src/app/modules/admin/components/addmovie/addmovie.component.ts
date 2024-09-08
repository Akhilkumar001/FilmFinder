import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

import { Movie } from 'src/app/models/Movie';
import { MovieService } from 'src/app/Services/movie.service';
import { ToastMessagesService } from 'src/app/Services/toast-messages.service';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {


  constructor(private movieService: MovieService,private toast:ToastMessagesService) { 
  }
  moviePicture: string | ArrayBuffer | null = null;

  movieForm!: FormGroup;
  castAndCrew: any[] = []
  geners:any[]=[]


  ngOnInit(): void {
 
    this.movieForm = new FormGroup({
      movieId: new FormControl(uuidv4(), [Validators.required]),
      movieName: new FormControl('', [Validators.required]),
      cast: new FormControl(''),
      genre: new FormControl(''),
      
      directorName: new FormControl('', [Validators.required]),
      releaseDate: new FormControl('', [Validators.required]),
      synopsis: new FormControl('', [Validators.required]),
      moviePicture: new FormControl(null),
           duration: new FormControl('', [Validators.required]),
           language: new FormControl('', [Validators.required])
      })
  }

  onSubmit() {
    if (this.movieForm.valid) {
      const { movieName, directorName, releaseDate, synopsis, duration, language } = this.movieForm.value;

      const movie: Movie = {
        movieId:uuidv4(),
        movieName,
        cast: this.castAndCrew,
        genre: this.geners,
        directorName,
        releaseDate,
        synopsis,
        duration,
        language,
        moviePicture: this.moviePicture
      };

      // this.movieService.addMovie(movie)
      this.movieService.addNewMovie(movie).subscribe(res=>{
        console.log(res);
        this.toast.showSuccess('Movie added Successfully')
      })
    } else {
      
      console.log('Form is invalid');

    }
  }
  onFileSelected(event: Event)
  {
    const inp = event.target as HTMLInputElement;   
    if(inp.files && inp.files[0])
    {
      const file = inp.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.moviePicture = reader.result;
        console.log(this.moviePicture)
      }

      reader.readAsDataURL(file)
      

    }
    console.log("inp",inp)
  }

  addCast()
  {
    console.log("this.movieForm.value.cast", this.movieForm.value.cast)
    this.castAndCrew.push(this.movieForm.value.cast)
    this.movieForm.get('cast')?.setValue('');

  }


  addGenre() {
    console.log("this.movieForm.value.genre", this.movieForm.value.genre)
    this.geners.push(this.movieForm.value.genre)
    this.movieForm.get('genre')?.setValue('');
  }


}


// export interface Movie {
//   movieId: string;
//   movieName: string;
//   cast: string[];
//   directorName: string;
//   releaseDate: Date;
//   synopsis: string;
//   moviePicture?: string | ArrayBuffer | null;

// }
