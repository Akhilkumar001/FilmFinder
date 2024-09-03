
import { User } from './User';  

export interface Review {
    movieId: string;       
    movieName: string;     
    reviewId: string;     
    reviewName: string;    
    user: User;            
}
