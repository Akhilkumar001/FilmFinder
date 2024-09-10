using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace FilmFinderApi.Models
{
    public class Watchlist
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("_id")] 
        public string WatchlistId { get; set; }

        [BsonElement("firstName")]
        public required string FirstName { get; set; }

        [BsonElement("userEmail")]
        public required string Email { get; set; }

        [BsonElement("movieId")] 
        public string MovieId { get; set; }

        [BsonElement("movieName")]
        public string MovieName { get; set; }

        [BsonElement("userId")]
        public string? Uid { get; set; }

        [BsonElement("isAddedToWatchlist")]
        public bool IsAddedToWatchlist { get; set; }
    }
}
