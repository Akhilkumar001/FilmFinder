using FilmFinderApi.Models;
using FilmFinderApi.Repositories;

namespace FilmFinderApi.Services
{
    public class WatchlistService : IWatchlistService
    {
        private readonly IWatchlistRepository _watchlistRepository;

        public WatchlistService(IWatchlistRepository repository)
        {
            _watchlistRepository = repository;
        }

        // Get all watchlist items
        public async Task<IEnumerable<Watchlist>> GetWatchlistsAsync()
        {
            return await _watchlistRepository.GetWatchlistsAsync();
        }

        // Get a watchlist by its ID
        public async Task<Watchlist> GetWatchlistByIdAsync(string watchlistId)
        {
            return await _watchlistRepository.GetWatchlistByIdAsync(watchlistId);
        }

        // Add a new watchlist item
        public async Task<Watchlist> AddWatchlistAsync(Watchlist watchlist)
        {
            return await _watchlistRepository.AddWatchlistAsync(watchlist);
        }

        // Update an existing watchlist item
        public async Task<Watchlist> UpdateWatchlistAsync(string watchlistId, Watchlist watchlist)
        {
            return await _watchlistRepository.UpdateWatchlistAsync(watchlistId, watchlist);
        }

        // Delete a watchlist item
        public async Task<bool> DeleteWatchlistAsync(string watchlistId)
        {
            return await _watchlistRepository.DeleteWatchlistAsync(watchlistId);
        }

        public async Task<List<Watchlist>> GetWatchlistByUserIdAsync(string uid)
        {
            return await _watchlistRepository.GetWatchlistByUserIdAsync(uid);
        }

        public async Task<bool> DeleteWatchlistByMovieIdAsync(string movieId)
        {
            return await _watchlistRepository.DeleteWatchlistByMovieIdAsync(movieId);
        }
    }

}