using FilmFinderApi.Authentication;
using FilmFinderApi.Models;
using FilmFinderApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FilmFinderApi.Controllers
{

    [Route("api/users")]
    [ApiController]

    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly JwtTokenGenerator _jwtTokenGenerator;
        public UserController(IUserService userService, JwtTokenGenerator jwtTokenGenerator)
        {
            _userService = userService;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _userService.GetByIdAsync(id);
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginCommand command)
        {

            if (command is not null)
            {
                var user = await _userService.FindByEmailAsync(command.Email);
                if (user is not null)
                {
                    if (user.Email == command.Email && BCrypt.Net.BCrypt.Verify(command.Password, user.Password))
                    {
                        var token = _jwtTokenGenerator.GenerateToken(user);
                        return Ok(token);
                    }
                }
            }

            return BadRequest("Empty Credentials");

        }

        [HttpPost]

        public async Task<IActionResult> CreateUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            user.Uid = null;
            await _userService.CreateAsync(user);
            return Ok(user.Uid);
        }
    }
}
