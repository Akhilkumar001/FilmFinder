import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/Review';
import { AuthService } from 'src/app/Services/auth.service';
import { MovieService } from 'src/app/Services/movie.service';
import { ReviewService } from 'src/app/Services/review.service';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent  implements OnInit{
  reviewForm!: FormGroup;
  currentUser:any;
  movieId:any;
  stars = [1,2,3,4,5];
  selectedMovie: any;

  constructor(private fb: FormBuilder, private authservice: AuthService, private route: ActivatedRoute, private movieservice: MovieService, private reviewservice: ReviewService) {
    this.reviewForm = this.fb.group({
      movieTitle: new FormControl({value:'' ,disabled:true}, Validators.required),
      reviewerName: new FormControl({value:'' ,disabled:true}, Validators.required),
      rating: new FormControl(null, Validators.required),
      reviewText: new FormControl(null, Validators.required),
      reviewDate: new FormControl(null, Validators.required)
    });
   
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const { movieTitle, reviewerName, rating, reviewText, reviewDate } = this.reviewForm.value;

      // Create a Review object with a unique ID
      const review: Review = {
        movieId: this.selectedMovie.movieId, // Generate a unique ID for the review
        movieName: this.selectedMovie.movieName, // Assuming movieTitle corresponds to movieName in your Review model
        reviewId: "", // Generate a unique ID for the review
        comment: reviewText,
        userid: this.currentUser.uid, // You may need to replace this with the actual user ID
        useremail: this.currentUser.email, // Replace with actual user email
        rating: rating
      };
    this.reviewservice.addReview(review).subscribe(rvs=>{
      alert("review added sucessfully")
    });
    console.log('Review Added:', review);
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

  setRating(star: number) {
    this.reviewForm.get('rating')?.setValue(star);
  }

}