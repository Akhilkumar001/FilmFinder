import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/Review'; 

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl: string = 'https://localhost:7025/api/UserReview'; 

  constructor(private http: HttpClient) {}

  // Fetch all reviews from the server
  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl + '/getAllReviews');
  }

  // Add a new review
  addReview(review: Review): Observable<any> {
    return this.http.post(this.baseUrl + '/addReview', review);
  }

  // Update review details by reviewId
  updateReviewById(reviewId: string, updatedReviewDetails: Partial<Review>): Observable<any> {
    return this.http.put(this.baseUrl + '/updateReviewById/' + reviewId, updatedReviewDetails);
  }

  // Delete a review by reviewId
  deleteReviewById(reviewId: string): Observable<any> {
    return this.http.delete(this.baseUrl + '/deleteReviewById/' + reviewId);
  }

  // Get details of a review by reviewId
  getReviewDetailsById(reviewId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/getReviewDetailsById/' + reviewId);
  }
  getReviewDetailsByMovieId(movieId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/getReviewDetailsByMovieId/' + movieId);
  }
}