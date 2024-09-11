using FilmFinderApi.Models;

namespace FilmFinderApi.Services
{
    public interface IWatchlistService
    {
        Task<IEnumerable<Watchlist>> GetWatchlistsAsync();
        Task<Watchlist> GetWatchlistByIdAsync(string watchlistId);
        Task<Watchlist> AddWatchlistAsync(Watchlist watchlist);
        Task<Watchlist> UpdateWatchlistAsync(string watchlistId, Watchlist watchlist);
        Task<bool> DeleteWatchlistAsync(string watchlistId);
        Task<List<Watchlist>> GetWatchlistByUserIdAsync(string uid);
        Task<bool> DeleteWatchlistByMovieIdAsync(string movieId);
    }
}