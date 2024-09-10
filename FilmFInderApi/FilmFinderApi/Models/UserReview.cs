using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FilmFinderApi.Models
{
    public class UserReview
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("_id")]
        public string? ReviewId { get; set; }

        [BsonElement("movieId")]
        public string MovieId { get; set; } = string.Empty;

        [BsonElement("movieName")]
        public string MovieName { get; set; } = string.Empty;

        [BsonElement("comment")]
        public string Comment { get; set; } = string.Empty;

        [BsonElement("userId")]
        public string UserId { get; set; } = string.Empty;

        [BsonElement("useremail")]
        public string? UserEmail { get; set; }

        [BsonElement("rating")]
        public int Rating { get; set; }
    }
}

