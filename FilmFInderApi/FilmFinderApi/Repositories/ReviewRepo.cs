using FilmFinderApi.Configuration;
using FilmFinderApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace FilmFinderApi.Repositories
{
    public class ReviewRepo : IReviewRepo
    {
        private readonly IMongoCollection<UserReview> _reviews;

        public ReviewRepo(IOptions<FilmFinderDbSettings> filmfinderdbSettings)
        {
            var mongoClient = new MongoClient(filmfinderdbSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(filmfinderdbSettings.Value.DatabaseName);
            _reviews = mongoDatabase.GetCollection<UserReview>(filmfinderdbSettings.Value.UserReviewCollection);
        }

        public async Task<List<UserReview>> GetAllReviewsAsync()
        {
            return await _reviews.Find(r => true).ToListAsync();
        }

        public async Task<UserReview> GetReviewByIdAsync(string id)
        {
            return await _reviews.Find(r => r.ReviewId == id).FirstOrDefaultAsync();
        }
        public async Task<List<UserReview>> GetReviewByMovieIdAsync(string id)
        {
            return await _reviews.Find(r => r.MovieId == id).ToListAsync();
        }

        public async Task CreateReviewAsync(UserReview review)
        {
            review.ReviewId = ObjectId.GenerateNewId().ToString();
            await _reviews.InsertOneAsync(review);
        }

        public async Task UpdateReviewAsync(string id, UserReview review)
        {
            await _reviews.ReplaceOneAsync(r => r.ReviewId == id, review);
        }

        public async Task DeleteReviewAsync(string id)
        {
            await _reviews.DeleteOneAsync(r => r.ReviewId == id);
        }

        public async Task<List<UserReview>> GetReviewByUserIdAsync(string id)
        {
            return await _reviews.Find(r => r.UserId == id).ToListAsync();
        }


    }
}
