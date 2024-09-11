using FilmFinderApi.Models;
using FilmFinderApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FilmFinderApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieService _movieService;
        public MoviesController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        // GET: api/movies
        [HttpGet("getAllmovies")]
        public async Task<ActionResult<IEnumerable<Movie>>> GetAllMovies()
        {
            var movies = await _movieService.GetAllMoviesAsync();
            return Ok(movies);
        }

        // GET: api/movies/{id}
        [HttpGet("getMovieDetailsByMovieId/{id}")]
        public async Task<ActionResult<Movie>> GetMovieById(string id)
        {
            var movie = await _movieService.GetMovieByIdAsync(id);
            if (movie == null)
            {
                return NotFound();
            }
            return Ok(movie);
        }

        // POST: api/movies
        [HttpPost("addNewMovie")]
        public async Task<ActionResult> CreateMovie([FromBody] Movie movie)
        {
            if (movie == null)
            {
                return BadRequest("Movie cannot be null");
            }

            await _movieService.CreateMovieAsync(movie);

            return CreatedAtAction(nameof(GetMovieById), new { id = movie.MovieId }, movie);
        }

        // PUT: api/movies/{id}
        [HttpPut("updateMovieByMovieId/{id}")]
        public async Task<ActionResult> UpdateMovie(string id, [FromBody] Movie movie)
        {
            var existingMovie = await _movieService.GetMovieByIdAsync(id);
            if (existingMovie == null)
            {
                return NotFound();
            }

            await _movieService.UpdateMovieAsync(id, movie);
            return NoContent();
        }

        // DELETE: api/movies/{id}
        [HttpDelete("deleteMovieByMovieId/{id}")]
        public async Task<ActionResult> DeleteMovie(string id)
        {
            var existingMovie = await _movieService.GetMovieByIdAsync(id);
            if (existingMovie == null)
            {
                return NotFound();
            }

            await _movieService.DeleteMovieAsync(id);
            return NoContent();
        }
    }
}
