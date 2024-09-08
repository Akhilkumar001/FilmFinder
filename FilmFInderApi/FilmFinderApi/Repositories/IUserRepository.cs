using FilmFinderApi.Models;

namespace FilmFinderApi.Repositories
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllAsync();
        Task<User> GetByIdAsync(string id);
        Task<User> CreateAsync(User user);
        Task<User> FindByEmailAsync(string email);
        Task UpdateAsync(string id, User user);
        Task DeleteAsync(string id);
    }
}
