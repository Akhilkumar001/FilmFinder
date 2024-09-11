using FilmFinderApi.Models;
using FilmFinderApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FilmFinderApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WatchlistController : ControllerBase
    {
        private readonly IWatchlistService _watchlistService;

        public WatchlistController(IWatchlistService watchlistService)
        {
            _watchlistService = watchlistService;
        }


        [HttpGet("getAllWatchlist")]
        public async Task<ActionResult<IEnumerable<Watchlist>>> GetWatchlists()
        {
            var watchlists = await _watchlistService.GetWatchlistsAsync();
            return Ok(watchlists);
        }


        [HttpGet("getWatchlistDetailsById")]
        public async Task<ActionResult<Watchlist>> GetWatchlistById(string id)
        {
            var watchlist = await _watchlistService.GetWatchlistByIdAsync(id);

            if (watchlist == null)
            {
                return NotFound();
            }

            return Ok(watchlist);
        }


        [HttpPost("addWatchlist")]
        public async Task<ActionResult<Watchlist>> AddWatchlist([FromBody] Watchlist watchlist)
        {

            var createdWatchlist = await _watchlistService.AddWatchlistAsync(watchlist);
            if (createdWatchlist == null)
            {
                return Ok("failedToAddWatchList");
            }
            return CreatedAtAction(nameof(GetWatchlistById), new { id = createdWatchlist.WatchlistId }, createdWatchlist);

        }


        [HttpPut("updateWatchlistById")]
        public async Task<ActionResult> UpdateWatchlist(string id, [FromBody] Watchlist watchlist)
        {
            var existingWatchlist = await _watchlistService.GetWatchlistByIdAsync(id);

            if (existingWatchlist == null)
            {
                return NotFound();
            }

            await _watchlistService.UpdateWatchlistAsync(id, watchlist);

            return NoContent();
        }


        [HttpDelete("deleteWatchlistById")]
        public async Task<ActionResult> DeleteWatchlist(string id)
        {
            var existingWatchlist = await _watchlistService.GetWatchlistByIdAsync(id);

            if (existingWatchlist == null)
            {
                return NotFound();
            }

            var isDeleted = await _watchlistService.DeleteWatchlistAsync(id);

            if (!isDeleted)
            {
                return BadRequest("Failed to delete watchlist.");
            }

            return NoContent();
        }

        [HttpGet("getAllWatchlistByUserId/{id}")]
        public async Task<ActionResult<List<Watchlist>>> getAllWatchlistByUserId(string id)
        {
            var watchlists = await _watchlistService.GetWatchlistByUserIdAsync(id);

            return Ok(watchlists);
        }
        [HttpDelete("deleteWatchlistByMovieId/{id}")]
        public async Task<ActionResult> DeleteWatchlistByMovieId(string id)
        {


            if (id == null)
            {
                return NotFound();
            }

            var isDeleted = await _watchlistService.DeleteWatchlistByMovieIdAsync(id);

            if (!isDeleted)
            {
                return BadRequest("Failed to delete watchlist.");
            }

            return NoContent();
        }
    }
}