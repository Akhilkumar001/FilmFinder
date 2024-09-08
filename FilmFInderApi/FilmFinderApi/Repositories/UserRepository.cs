using FilmFinderApi.Configuration;
using FilmFinderApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace FilmFinderApi.Repositories
{
    public class UserRepository : IUserRepository
    {

        private readonly IMongoCollection<User> _userCollection;
        private readonly FilmFinderDbSettings _settings;

        public UserRepository(IOptions<FilmFinderDbSettings> settings)
        {
            _settings = settings.Value;
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            _userCollection = database.GetCollection<User>("Users");
        }

        public async Task<User> CreateAsync(User user)
        {
            await _userCollection.InsertOneAsync(user);
            return user;
        }

        public Task DeleteAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task<List<User>> GetAllAsync()
        {
            return _userCollection.Find(c => true).ToListAsync();
        }

        public Task<User> FindByEmailAsync(string email)
        {
            return _userCollection.Find(c => c.Email == email).FirstOrDefaultAsync();
        }

        public Task<User> GetByIdAsync(string id)
        {
            return _userCollection.Find(c => c.Uid == id).FirstOrDefaultAsync();
        }

        public Task UpdateAsync(string id, User user)
        {
            throw new NotImplementedException();
        }
    }
}
