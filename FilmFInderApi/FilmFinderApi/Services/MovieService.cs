using System.Collections.Generic;
using System.Threading.Tasks;
using FilmFinderApi.Repositories;
using FilmFinderApi.Models;
namespace FilmFinderApi.Services
{
    public class MovieService : IMovieService

    { 

        private readonly IMovieRepository _movieRepository;

        public MovieService(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }

        public async Task<IEnumerable<Movie>> GetAllMoviesAsync()
        {
            return await _movieRepository.GetAllMoviesAsync();
        }

        public async Task<Movie> GetMovieByIdAsync(string id)
        {
            return await _movieRepository.GetMovieByIdAsync(id);
        }

        public async Task CreateMovieAsync(Movie movie)
        {
            await _movieRepository.CreateMovieAsync(movie);
        }

        public async Task UpdateMovieAsync(string id, Movie movie)
        {
            await _movieRepository.UpdateMovieAsync(id, movie);
        }

        public async Task DeleteMovieAsync(string id)
        {
            await _movieRepository.DeleteMovieAsync(id);
        }
    }
}
