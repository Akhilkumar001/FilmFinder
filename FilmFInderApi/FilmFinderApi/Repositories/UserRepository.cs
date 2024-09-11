using FilmFinderApi.Configuration;
using FilmFinderApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson.IO;
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
            _userCollection = database.GetCollection<User>(_settings.UsersCollection);
        }

        public async Task<User> CreateAsync(User user)
        {
            await _userCollection.InsertOneAsync(user);
            return user;
        }

        public async Task DeleteUserAsync(string id)
        {
            await _userCollection.DeleteOneAsync(u => u.Uid == id);
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

        public async Task UpdateUserAsync(string id, User user)
        {
            await _userCollection.ReplaceOneAsync(u => u.Uid == id, user);
        }
    }
}
