using FilmFinderApi.Models;
using FilmFinderApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace FilmFinderApi.Controllers
{

    [Route("api/users")]
    [ApiController]

    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }


        [HttpPost("register")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User data is null");
            }

            // Check if the user already exists
            var existingUser = await _userService.FindByEmailAsync(user.Email);
            if (existingUser != null)
            {
                return BadRequest("User already exists");
            }

            // Proceed with user registration
            try
            {
                await _userService.CreateAsync(user);
                return Ok("User registered successfully : " + user.Uid);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., to a file or monitoring system)
                Console.Error.WriteLine($"Error during user registration: {ex.Message}");
                return StatusCode(500, "Internal server error during registration");
            }
        }



        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            Console.WriteLine($"Received login request for email: {loginRequest.Email}");

            var user = await _userService.LoginAsync(loginRequest.Email, loginRequest.Password);
            if (user != null)
            {
                Console.WriteLine($"User found: {user.Email}");

                if (user.Uid != null)
                {
                    HttpContext.Session.SetString("UserId", user.Uid);
                    HttpContext.Session.SetString("UserEmail", user.Email);
                    HttpContext.Session.SetString("UserRole", user.UserType == "Admin" ? "Admin" : "User");

                    Console.WriteLine("Login successful");
                    return Ok(new { Message = "Login successful", User = user });
                }
                else
                {
                    Console.WriteLine("User ID is null");
                    return BadRequest("User ID cannot be null");
                }
            }

            Console.WriteLine("Invalid credentials");
            return Unauthorized("Invalid credentials");
        }

        [HttpGet("check-session")]
        public IActionResult CheckSession()
        {
            var user = HttpContext.Session.GetString("User");
            if (user != null)
            {
                return Ok(true); // Session is valid
            }
            return Ok(false); // Session is invalid
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Clear session on logout
            HttpContext.Session.Clear();
            return Ok("Logged out");
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user is not null)
            {
                await _userService.DeleteUserAsync(id);
                return Ok();
            }
            return NotFound();
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateUser(string id, User user)
        {
            var eUser = await _userService.GetByIdAsync(id);
            if (eUser is not null)
            {
                await _userService.UpdateUserAsync(id, user);
                return Ok();
            }
            return NotFound();

        }

    }
}
