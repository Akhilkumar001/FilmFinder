import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Watchlist } from '../models/watchlist';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private baseUrl = 'https://localhost:7025/api/Watchlist';  

  constructor(private http: HttpClient) {}

  
  getAllWatchlist(): Observable<Watchlist[]> {
    return this.http.get<Watchlist[]>(this.baseUrl + '/getAllWatchlist');
  }

  
  addWatchlist(watchlist: Watchlist): Observable<any> {
    console.log(watchlist);
    return this.http.post(this.baseUrl + '/addWatchlist', watchlist, {
      responseType: 'json'
    });
    
  }

  
  updateWatchlistById(watchlistId: string, updatedWatchlistDetails: Partial<Watchlist>): Observable<any> {
    return this.http.put(this.baseUrl + '/updateWatchlistById/' + watchlistId, updatedWatchlistDetails);
  }

  // Delete a review by reviewId
  deleteWatchlistById(watchlistId: string): Observable<any> {
    return this.http.delete(this.baseUrl + '/deleteWatchlistById/' + watchlistId);
  }

  // Get details of a review by reviewId
  getWatchlistDetailsById(watchlistId: string): Observable<Watchlist> {
    return this.http.get<Watchlist>(this.baseUrl + '/getWatchlistDetailsById/' + watchlistId);
  }
}
