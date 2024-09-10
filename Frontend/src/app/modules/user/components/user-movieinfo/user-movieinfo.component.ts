import { Component } from '@angular/core';

@Component({
  selector: 'app-user-movieinfo',
  templateUrl: './user-movieinfo.component.html',
  styleUrls: ['./user-movieinfo.component.css']
})
export class UserMovieinfoComponent {
  // Add component logic here if needed
  movie = {
    name: 'Inception',
    genre: 'Science Fiction, Thriller',
    imdbRating: '8.8/10',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    releaseDate: '2010-07-16',
    director: 'Christopher Nolan',
    duration: '2h 28min',
    language: 'English',
    summary: "Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter people's dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves. Cobb gets a chance at redemption when he is offered a seemingly impossible task: Plant an idea in someone's mind. If he succeeds, it will be the perfect crime, but a dangerous enemy anticipates Cobb's every move."
  
};
addReview() {
  alert('Add review functionality not implemented yet!');
}
}