using FilmFinderApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FilmFinderApi.Services
{
    public interface IReviewService
    {
        Task<List<UserReview>> GetAllReviewsAsync();
        Task<UserReview> GetReviewByIdAsync(string id);
        Task CreateReviewAsync(UserReview review);
        Task UpdateReviewAsync(string id, UserReview review);
        Task DeleteReviewAsync(string id);
        Task<List<UserReview>> GetReviewByMovieIdAsync(string id);
        Task<List<UserReview>> GetReviewByUserIdAsync(string id);
    }
}