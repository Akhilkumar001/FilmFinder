using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FilmFinderApi.Models
{
    public class Movie
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)] 
        public string MovieId { get; set; }

        [BsonElement("movieName")]  
        public string MovieName { get; set; }

        [BsonElement("cast")]
        public string[] Cast { get; set; }

        [BsonElement("genre")] 
        public string[] Genre { get; set; }

        [BsonElement("directorName")]  
        public string DirectorName { get; set; }

        [BsonElement("releaseDate")]  
        public DateTime ReleaseDate { get; set; }

        [BsonElement("synopsis")] 
        public string Synopsis { get; set; }

        [BsonElement("moviePicture")]  
        public string? MoviePicture { get; set; }

        [BsonElement("duration")]  
        public string Duration { get; set; }

        [BsonElement("language")]  
        public string Language { get; set; }
    }
}
