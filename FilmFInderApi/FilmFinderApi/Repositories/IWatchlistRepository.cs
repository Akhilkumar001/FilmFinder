﻿using FilmFinderApi.Models;

namespace FilmFinderApi.Repositories
{
    public interface IWatchlistRepository
    {
        Task<IEnumerable<Watchlist>> GetWatchlistsAsync();
        Task<Watchlist> GetWatchlistByIdAsync(string watchlistId);
        Task<Watchlist> AddWatchlistAsync(Watchlist watchlist);
        Task<Watchlist> UpdateWatchlistAsync(string watchlistId, Watchlist watchlist);
        Task<bool> DeleteWatchlistAsync(string watchlistId);
    }
}
