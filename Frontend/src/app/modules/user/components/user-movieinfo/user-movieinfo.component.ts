import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { MovieService } from 'src/app/Services/movie.service';
import { ReviewService } from 'src/app/Services/review.service';

@Component({
  selector: 'app-user-movieinfo',
  templateUrl: './user-movieinfo.component.html',
  styleUrls: ['./user-movieinfo.component.css']
})
export class UserMovieinfoComponent implements OnInit{
  constructor(private movieService:MovieService,private route:ActivatedRoute,private reviewService:ReviewService,private userService:AuthService){}

  movie:any
  movieId:any
  reviews:any
  review:any[]=[]
  currentUser:any
addReview() {

  alert('Add review functionality not implemented yet!');
}
ngOnInit(): void {
  this.route.paramMap.subscribe(p=>{
    this.movieId=p.get("id")
    console.log(this.movieId)
    this.currentUser=this.userService.getLoggedInUser()
    console.log("hello", this.currentUser)
    this.movieService.getMovieDetailsByMovieId(this.movieId).subscribe(res=>{
      this.movie=res
      console.log(this.movie)
      this.reviewService.getReviewDetailsByMovieId(this.movieId).subscribe(res=>{
        console.log(res[0].movieId==this.movieId)
        //this.review=res
        
        for(let i=0;i<res.length;i++){
          if(res[i].movieId==this.movieId){
            this.review.push(res[i])
            console.log("hey")
          }
        }
        console.log("helloo",this.review)

        // }

      })

    })
  })
  
}
}