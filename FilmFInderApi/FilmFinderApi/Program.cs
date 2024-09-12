using FilmFinderApi.Configuration;
using FilmFinderApi.Repositories;
using FilmFinderApi.Services;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

var config = builder.Configuration;

// Add session handling
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Adjust the session timeout as needed
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
});

builder.Services.AddAuthentication("Cookies")
    .AddCookie(options =>
    {
        options.LoginPath = "/users/login";  // Define your login path
        options.LogoutPath = "/users/logout";
    });

builder.Services.AddDistributedMemoryCache();

builder.Services.AddControllers();

builder.Services.Configure<FilmFinderDbSettings>(
    builder.Configuration.GetSection("FilmFinderDataBaseConfig")
);

builder.Services.AddSingleton(sp =>
    sp.GetRequiredService<IOptions<FilmFinderDbSettings>>().Value
);

builder.Services.AddScoped<IMovieRepository, MovieRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IWatchlistRepository, WatchlistRepository>();
builder.Services.AddScoped<IReviewRepo, ReviewRepo>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IMovieService, MovieService>();
builder.Services.AddScoped<IReviewService, ReviewService>();
builder.Services.AddScoped<IWatchlistService, WatchlistService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigin");

app.UseSession(); // Enable session middleware
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();