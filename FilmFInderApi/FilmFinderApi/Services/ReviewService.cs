using FilmFinderApi.Models;
using FilmFinderApi.Repositories;

namespace FilmFinderApi.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IReviewRepo _reviewRepo;

        // Constructor to inject IReviewRepo dependency
        public ReviewService(IReviewRepo reviewRepo)
        {
            _reviewRepo = reviewRepo ?? throw new ArgumentNullException(nameof(reviewRepo));
        }

        public async Task CreateReviewAsync(UserReview review)
        {
            await _reviewRepo.CreateReviewAsync(review);
        }

        public async Task DeleteReviewAsync(string id)
        {
            await _reviewRepo.DeleteReviewAsync(id);
        }

        public async Task<List<UserReview>> GetAllReviewsAsync()
        {
            try
            {
                return await _reviewRepo.GetAllReviewsAsync() ?? new List<UserReview>();
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while retrieving reviews: {ex.Message}");
                return new List<UserReview>();
            }
        }

        public async Task<UserReview> GetReviewByIdAsync(string id)
        {
            return await _reviewRepo.GetReviewByIdAsync(id);
        }

        public async Task<List<UserReview>> GetReviewByMovieIdAsync(string id)
        {
            return await _reviewRepo.GetReviewByMovieIdAsync(id);
        }

        public async Task<List<UserReview>> GetReviewByUserIdAsync(string id)
        {
            return await _reviewRepo.GetReviewByUserIdAsync(id);
        }
        public async Task UpdateReviewAsync(string id, UserReview review)
        {
            if (review == null)
            {
                throw new ArgumentNullException(nameof(review));
            }

            // Handle update logic
            await _reviewRepo.UpdateReviewAsync(id, review);
        }
    }
}