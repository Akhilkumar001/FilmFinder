using FilmFinderApi.Configuration;
using FilmFinderApi.Repositories;
using FilmFinderApi.Services;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();


builder.Services.Configure<FilmFinderDbSettings>(
    builder.Configuration.GetSection("FilmFinderDataBaseConfig")
);

builder.Services.AddSingleton(sp =>
    sp.GetRequiredService<IOptions<FilmFinderDbSettings>>().Value
);

builder.Services.AddScoped<IMovieRepository, MovieRepository>();
builder.Services.AddScoped<IMovieService, MovieService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(options => options.WithOrigins("*").AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());

app.UseAuthorization();

app.MapControllers();

app.Run();
