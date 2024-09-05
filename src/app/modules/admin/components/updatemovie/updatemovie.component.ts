import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/Services/movie.service';
import { Movie } from 'src/app/models/Movie';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-updatemovie',
  templateUrl: './updatemovie.component.html',
  styleUrls: ['./updatemovie.component.css']
})
export class UpdatemovieComponent implements OnInit {

  movieForm!: FormGroup;
  castAndCrew: string[] = [];
  geners: string[] = [];
  moviePicture: string | ArrayBuffer | null = null;
  selectedMovie: any;
  movieId: string | null = null;

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id');
      if (this.movieId) {
        this.selectedMovie = this.movieService.getMovieDetailsById(this.movieId);
        if (this.selectedMovie) {
          this.initializeForm();
        } else {
          console.error('No movie found with ID:', this.movieId);
        }
      } else {
        console.error('No movie ID provided');
      }
    });
  }

  initializeForm() {
    this.movieForm = new FormGroup({
      movieId: new FormControl(this.selectedMovie.movieId || '', [Validators.required]),
      movieName: new FormControl(this.selectedMovie.movieName || '', [Validators.required]),
      cast: new FormControl(this.selectedMovie.cast || ''),
      genre: new FormControl(this.selectedMovie.genre || ''),
      directorName: new FormControl(this.selectedMovie.directorName || '', [Validators.required]),
      releaseDate: new FormControl(this.selectedMovie.releaseDate || '', [Validators.required]),
      synopsis: new FormControl(this.selectedMovie.synopsis || '', [Validators.required]),
      moviePicture: new FormControl(this.selectedMovie.moviePicture || null),
      duration: new FormControl(this.selectedMovie.duration || '', [Validators.required]),
      language: new FormControl(this.selectedMovie.language || '', [Validators.required]),
    });

    this.moviePicture = this.selectedMovie.moviePicture;
    this.castAndCrew = this.selectedMovie.cast || [];
    this.geners = this.selectedMovie.genre || [];
  }

  onSubmit() {
    if (this.movieForm.valid) {
      const { movieName, directorName, releaseDate, synopsis, duration, language } = this.movieForm.value;
      const movie: Movie = {
        movieId: this.selectedMovie?.movieId || uuidv4(),
        movieName,
        cast: this.castAndCrew,
        genre: this.geners,
        directorName,
        releaseDate,
        synopsis,
        duration,
        language,
        moviePicture: this.moviePicture === null ? this.selectedMovie?.moviePicture : this.moviePicture
      };

      this.movieService.UpdateMoveById(this.selectedMovie.movieId,movie);
    } else {
      console.log('Form is invalid');
    }
  }


 

  onFileSelected(event: Event) {
    const inp = event.target as HTMLInputElement;
    if (inp.files && inp.files[0]) {
      const file = inp.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.moviePicture = reader.result;
      }
      reader.readAsDataURL(file);
    }
  }

  addCast() {
    const castValue = this.movieForm.get('cast')?.value;
    if (castValue) {
      this.castAndCrew.push(castValue);
      this.movieForm.get('cast')?.setValue('');
    }
  }

  addGenre() {
    const genreValue = this.movieForm.get('genre')?.value;
    if (genreValue) {
      this.geners.push(genreValue);
      this.movieForm.get('genre')?.setValue('');
    }
  }
}
