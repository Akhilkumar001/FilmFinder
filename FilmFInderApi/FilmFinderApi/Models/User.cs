using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Reflection.Metadata;

namespace FilmFinderApi.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Uid { get; set; }

        [BsonElement("firstName")]
        public required string FirstName { get; set; }
        [BsonElement("lastName")]
        public required string LastName { get; set; }
        [BsonElement("email")]
        public required string Email { get; set; }
        [BsonElement("password")]
        public required string Password { get; set; }
        [BsonElement("date_of_birth")]
        public required string DOB { get; set; }
        [BsonElement("userType")]
        public required string UserType { get; set; }
        [BsonElement("location")]
        public required string Location { get; set; }
        [BsonElement("profilePicture")]
        public Blob? ProfilePicture { get; set; }

    }
}
