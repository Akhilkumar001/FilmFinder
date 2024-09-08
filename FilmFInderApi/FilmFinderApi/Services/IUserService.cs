using FilmFinderApi.Models;

namespace FilmFinderApi.Services
{
    public interface IUserService
    {
        Task<List<User>> GetAllAsync();
        Task<User> GetByIdAsync(string id);
        Task<User> CreateAsync(User user);
        Task DeleteUserAsync(string id);

        Task UpdateUserAsync(string id, User user);
        Task<User> FindByEmailAsync(string email);

    }
}
