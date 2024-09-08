import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/Services/movie.service';
import { ToastMessagesService } from 'src/app/Services/toast-messages.service';
import { Movie } from 'src/app/models/Movie';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-updatemovie',
  templateUrl: './updatemovie.component.html',
  styleUrls: ['./updatemovie.component.css']
})
export class UpdatemovieComponent implements OnInit {

  movieForm: FormGroup; // Initialize as an empty FormGroup
  castAndCrew: string[] = [];
  geners: string[] = [];
  moviePicture: string | ArrayBuffer | null = null;
  selectedMovie: any;
  movieId: string | null = null;

  constructor(private toast:ToastMessagesService, private movieService: MovieService, private route: ActivatedRoute,private router:Router) {
    this.movieForm = new FormGroup({ 
      movieId: new FormControl('', [Validators.required]),
      movieName: new FormControl('', [Validators.required]),
      cast: new FormControl(''),
      genre: new FormControl(''),
      directorName: new FormControl('', [Validators.required]),
      releaseDate: new FormControl('', [Validators.required]),
      synopsis: new FormControl('', [Validators.required]),
      moviePicture: new FormControl(null),
      duration: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id');
      if (this.movieId) {
        this.movieService.getMovieDetailsByMovieId(this.movieId).subscribe(res => {
          this.selectedMovie = res;
          if (this.selectedMovie) {
            this.initializeForm();
          }
        });
      } else {
        console.error('No movie ID provided');
      }
    });
  }

  initializeForm() {
    this.movieForm.setValue({
      movieId: this.selectedMovie.movieId || '',
      movieName: this.selectedMovie.movieName || '',
      cast: this.selectedMovie.cast || '',
      genre: this.selectedMovie.genre || '',
      directorName: this.selectedMovie.directorName || '',
      releaseDate: this.selectedMovie.releaseDate || '',
      synopsis: this.selectedMovie.synopsis || '',
      moviePicture: this.selectedMovie.moviePicture || null,
      duration: this.selectedMovie.duration || '',
      language: this.selectedMovie.language || ''
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
      this.movieService.updateMovieByMovieId(this.selectedMovie.movieId, movie).subscribe(res => {
       this.toast.showSuccess("Updated Successfully")
       setTimeout(()=>
      {
        this.router.navigate(['/admin-dashboard'])
      },3000)
       
      });
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
