using FilmFinderApi.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FilmFinderApi.Authentication
{

    public interface IJwtTokenGenerator
    {
        string GenerateToken(User user);
    }

    public class JwtTokenGenerator : IJwtTokenGenerator
    {
        private readonly JwtOptions _options;
        public JwtTokenGenerator(IOptions<JwtOptions> options)
        {
            _options = options.Value;
        }
        public string GenerateToken(User user)
        {
            var claims = new Claim[]
            {
                new Claim("uid",user.Uid.ToString()),
                new Claim(JwtRegisteredClaimNames.Email,user.Email),
                new Claim("firstName",user.FirstName),
                new Claim("lastName",user.LastName),
                new Claim("password",user.Password),
                new Claim("date_of_birth",user.DOB),
                new Claim("userType",user.UserType),
                new Claim("location",user.Location)
            };

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_options.SecretKey)), SecurityAlgorithms.HmacSha256);


            var token = new JwtSecurityToken(
                _options.Issuer,
                _options.Audience,
                claims,
                null,
                DateTime.UtcNow.AddHours(1),
                signingCredentials);

            string jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
            return jwtToken;
        }
    }
}
