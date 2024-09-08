using FilmFinderApi.Authentication;
using Microsoft.Extensions.Options;

namespace FilmFinderApi.OptionsSetup
{
    public class JwtOptionsSetup : IConfigureOptions<JwtOptions>
    {
        private readonly IConfiguration _configuration;
        private const string JwtSectionName = "JwtSettings";

        public JwtOptionsSetup(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void Configure(JwtOptions options)
        {
            _configuration.GetSection(JwtSectionName).Bind(options);
        }
    }
}
