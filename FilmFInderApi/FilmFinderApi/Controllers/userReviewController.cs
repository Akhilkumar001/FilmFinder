
using FilmFinderApi.Models;
using FilmFinderApi.Repositories;
using FilmFinderApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FilmFinderApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public UserReviewController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpGet("getAllReviews")]
        public async Task<ActionResult<IEnumerable<UserReview>>> GetAllReviews()
        {
            var reviews = await _reviewService.GetAllReviewsAsync();
            return Ok(reviews);
        }

        // POST: api/userReview
        [HttpPost("addReview")]
        public async Task<ActionResult> CreateReview([FromBody] UserReview review)
        {
            if (review == null)
            {
                return BadRequest("Review cannot be null");
            }

            await _reviewService.CreateReviewAsync(review);

            return CreatedAtAction(nameof(GetReviewById), new { id = review.ReviewId }, review);
        }

        // GET: api/userReview/{id}
        [HttpGet("getReviewDetailsById")]
        public async Task<ActionResult<UserReview>> GetReviewById(string id)
        {
            var review = await _reviewService.GetReviewByIdAsync(id);
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }

        [HttpGet("getReviewDetailsByMovieId/{id}")]
        public async Task<ActionResult<List<UserReview>>> GetReviewByMovieId(string id)
        {
            var review = await _reviewService.GetReviewByMovieIdAsync(id);
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }

        [HttpGet("getReviewDetailsByUserId")]
        public async Task<ActionResult<List<UserReview>>> GetReviewByUserId(string id)
        {
            var review = await _reviewService.GetReviewByUserIdAsync(id);
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }

        // PUT: api/userReview/{id}
        [HttpPut("updateReviewById")]
        public async Task<ActionResult> UpdateReview(string id, [FromBody] UserReview review)
        {
            if (review == null)
            {
                return BadRequest("Review cannot be null");
            }

            var existingReview = await _reviewService.GetReviewByIdAsync(id);
            if (existingReview == null)
            {
                return NotFound();
            }

            await _reviewService.UpdateReviewAsync(id, review);
            return NoContent();
        }

        // DELETE: api/userReview/{id}
        [HttpDelete("deleteReviewById")]
        public async Task<ActionResult> DeleteReview(string id)
        {
            var existingReview = await _reviewService.GetReviewByIdAsync(id);
            if (existingReview == null)
            {
                return NotFound();
            }

            await _reviewService.DeleteReviewAsync(id);
            return NoContent();
        }
    }
}