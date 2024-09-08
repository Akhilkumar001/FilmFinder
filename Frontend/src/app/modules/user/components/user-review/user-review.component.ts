import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { MovieService } from 'src/app/Services/movie.service';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent  implements OnInit{
  reviewForm!: FormGroup;
  currentUser:any;
  movieId:any;
  stars = [
    { value: 5, label: '5 stars' },
    { value: 4, label: '4 stars' },
    { value: 3, label: '3 stars' },
    { value: 2, label: '2 stars' },
    { value: 1, label: '1 star' }
  ];
  selectedMovie: any;

  constructor(private fb: FormBuilder, private authservice: AuthService, private route: ActivatedRoute, private movieservice: MovieService) {
    this.reviewForm = this.fb.group({
      movieTitle: new FormControl({vaule:'' ,disabled:true}, Validators.required),
      reviewerName: new FormControl('', Validators.required),
      rating: new FormControl(null, Validators.required),
      reviewText: new FormControl(null, Validators.required),
      reviewDate: new FormControl(null, Validators.required)
    });
   
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      console.log(this.reviewForm);
      
    }
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(param=>{
      this.movieId=param.get('id')
      console.log(this.movieId)
      this.currentUser=this.authservice.getLoggedInUser();
      console.log(this.currentUser)
      this.movieservice.getMovieDetailsByMovieId(this.movieId).subscribe(res =>{
        this.selectedMovie = res;
        console.log(res,"       ====",this.selectedMovie)

        console.log("selectdmovie", this.selectedMovie.movieName)


        this.reviewForm.get('movieTitle')?.setValue(this.selectedMovie.movieName)
        this.reviewForm.get('reviewerName')?.setValue(this.currentUser.firstName+" "+this.currentUser.lastName)

      })
      // this.reviewForm = this.fb.group({
      //   movieTitle: new FormControl({ value: this.selectedMovie.movieName, disabled: true }, Validators.required),
      //   reviewerName: new FormControl({ value: this.currentUser.firstName + ' ' + this.currentUser.lastName, disabled: true }, Validators.required),
      //   rating:  new FormControl(null,Validators.required),
      //   reviewText: new FormControl(null,Validators.required),
      //   reviewDate:  new FormControl(null,Validators.required)
      // });
    })
    
  }


}
