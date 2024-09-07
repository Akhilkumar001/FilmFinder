using FilmFinderApi.Models;

namespace FilmFinderApi.Services
{
  
        public interface IMovieService
        {
            Task<IEnumerable<Movie>> GetAllMoviesAsync();
            Task<Movie> GetMovieByIdAsync(string id);
            Task CreateMovieAsync(Movie movie);
            Task UpdateMovieAsync(string id, Movie movie);
            Task DeleteMovieAsync(string id);
        }

}
