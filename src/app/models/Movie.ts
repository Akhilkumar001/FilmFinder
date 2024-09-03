

import { Review } from './Review'; 

export interface Movie {
    movieId: string;       
    movieName: string;    
    cast: string[];        
    directorName: string; 
    releaseDate: Date;     
    moviePicture: string;  
    reviews: Review[];     
}
