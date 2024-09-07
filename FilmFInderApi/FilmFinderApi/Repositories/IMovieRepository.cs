using System.Collections.Generic;
using System.Threading.Tasks;
using FilmFinderApi.Models;
namespace FilmFinderApi.Repositories
{
    public interface IMovieRepository
    {
        Task<IEnumerable<Movie>> GetAllMoviesAsync();
        Task<Movie> GetMovieByIdAsync(string id);
        Task CreateMovieAsync(Movie movie);
        Task UpdateMovieAsync(string id, Movie movie);
        Task DeleteMovieAsync(string id);
    }
}
