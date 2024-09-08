﻿namespace FilmFinderApi.Authentication
{
    public class JwtOptions
    {
        public string Issuer { get; set; }
        public string SecretKey { get; set; }
        public string Audience { get; set; }
    }
}
