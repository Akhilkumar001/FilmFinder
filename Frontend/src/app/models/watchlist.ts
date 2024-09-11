export interface Watchlist {
    watchlistId: string;  // Ensure this is included if it's expected
    movieId: string;
    movieName: string;
    uid: string;
    userName: string;
    userEmail: string;   // Ensure this matches the backend model
    isAddedToWatchlist: boolean;
    }