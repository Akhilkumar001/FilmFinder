

export interface Movie {
    movieId: string;       
    movieName: string;    
    cast: string[];
    genre: string[];  
    directorName: string; 
    releaseDate: Date; 
    synopsis: string;
    moviePicture?: string | ArrayBuffer | null;
    duration: string;
    language: string;
  
}
