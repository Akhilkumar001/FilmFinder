using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace FilmFinderApi.Models
{
    public class Watchlist
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("watchlistId")]
        public string WatchlistId { get; set; }

        [BsonElement("movieId")]
        public string MovieId { get; set; }

        [BsonElement("movieName")]
        public string MovieName { get; set; }

        [BsonElement("uid")]
        public string Uid { get; set; }

        [BsonElement("userName")]
        public string UserName { get; set; }

        [BsonElement("userEmail")]
        public string UserEmail { get; set; }  // Ensure this matches the frontend model

        [BsonElement("isAddedToWatchlist")]
        public bool IsAddedToWatchlist { get; set; }
    }
}
