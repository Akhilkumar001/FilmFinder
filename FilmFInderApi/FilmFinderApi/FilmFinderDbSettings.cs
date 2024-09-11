namespace FilmFinderApi.Configuration
{
    public class FilmFinderDbSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string MoviesCollectionName { get; set; }
        public string UsersCollection { get; set; }
        public string UserReviewCollection { get; set; }
        public string WatchlistCollection { get; set; }
    }
}
