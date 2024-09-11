using FilmFinderApi.Models;
using FilmFinderApi.Repositories;

namespace FilmFinderApi.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User?> LoginAsync(string email, string password)
        {
            var user = await _userRepository.FindByEmailAsync(email);
            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return user;
            }
            return null;
        }

        public Task<User> CreateAsync(User user)
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            return _userRepository.CreateAsync(user);
        }

        public Task<User> FindByEmailAsync(string email)
        {
            return _userRepository.FindByEmailAsync(email);
        }

        public Task<User> GetByIdAsync(string id)
        {
            return _userRepository.GetByIdAsync(id);
        }

        public Task<List<User>> GetAllAsync()
        {
            return _userRepository.GetAllAsync();
        }

        public Task UpdateUserAsync(string id, User user)
        {
            return _userRepository.UpdateUserAsync(id, user);
        }

        public Task DeleteUserAsync(string id)
        {
            return _userRepository.DeleteUserAsync(id);
        }
    }
}
