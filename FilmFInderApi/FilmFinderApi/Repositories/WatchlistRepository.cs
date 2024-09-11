using FilmFinderApi.Configuration;
using FilmFinderApi.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace FilmFinderApi.Repositories
{
    public class WatchlistRepository : IWatchlistRepository
    {
        private readonly IMongoCollection<Watchlist> _watchlist;

        public WatchlistRepository(IOptions<FilmFinderDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _watchlist = database.GetCollection<Watchlist>(settings.Value.WatchlistCollection);
        }

        // Get all watchlist items
        public async Task<IEnumerable<Watchlist>> GetWatchlistsAsync()
        {
            return await _watchlist.Find(watchlist => true).ToListAsync();
        }

        // Get a watchlist by its ID
        public async Task<Watchlist> GetWatchlistByIdAsync(string watchlistId)
        {
            return await _watchlist.Find(watchlist => watchlist.WatchlistId == watchlistId).FirstOrDefaultAsync();
        }

        // Add a new watchlist item
        public async Task<Watchlist> AddWatchlistAsync(Watchlist watchlist)
        {
            watchlist.WatchlistId = ObjectId.GenerateNewId().ToString();
            var existingMovie = _watchlist.Find(m => m.MovieName == watchlist.MovieName).FirstOrDefault();
            if (existingMovie == null)
            {
                await _watchlist.InsertOneAsync(watchlist);
                return watchlist;

            }
            return null;


            // Return the created watchlist
        }

        // Update an existing watchlist item
        public async Task<Watchlist> UpdateWatchlistAsync(string watchlistId, Watchlist watchlist)
        {
            await _watchlist.ReplaceOneAsync(w => w.WatchlistId == watchlistId, watchlist);
            return watchlist;  // Return the updated watchlist
        }

        // Delete a watchlist item
        public async Task<bool> DeleteWatchlistAsync(string watchlistId)
        {
            var result = await _watchlist.DeleteOneAsync(watchlist => watchlist.WatchlistId == watchlistId);
            return result.DeletedCount > 0;  // Return true if deletion was successful
        }

        public async Task<List<Watchlist>> GetWatchlistByUserIdAsync(string uid)
        {
            return await _watchlist.Find(w => w.Uid == uid).ToListAsync();
        }

        public async Task<bool> DeleteWatchlistByMovieIdAsync(string movieId)
        {
            var result = await _watchlist.DeleteOneAsync(watchlist => watchlist.MovieId == movieId);
            return result.DeletedCount > 0;
        }
    }

}