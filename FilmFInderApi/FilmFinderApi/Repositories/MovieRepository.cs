using FilmFinderApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using FilmFinderApi.Configuration;
using MongoDB.Bson;

namespace FilmFinderApi.Repositories
{
    public class MovieRepository : IMovieRepository
    {


        private readonly IMongoCollection<Movie> _movies;

        public MovieRepository(IOptions<FilmFinderDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _movies = database.GetCollection<Movie>(settings.Value.MoviesCollectionName);
        }

        public async Task<IEnumerable<Movie>> GetAllMoviesAsync()
        {
            return await _movies.Find(movie => true).ToListAsync();
        }

        public async Task<Movie> GetMovieByIdAsync(string id)
        {
            return await _movies.Find(movie => movie.MovieId == id).FirstOrDefaultAsync();
        }

        public async Task CreateMovieAsync(Movie movie)
        {

            movie.MovieId=ObjectId.GenerateNewId().ToString();      

            await _movies.InsertOneAsync(movie);
        }

        public async Task UpdateMovieAsync(string id, Movie movie)
        {
            await _movies.ReplaceOneAsync(movie => movie.MovieId == id, movie);
        }

        public async Task DeleteMovieAsync(string id)
        {
            await _movies.DeleteOneAsync(movie => movie.MovieId == id);
        }

    }
}
