using UserManagement.Core.Interfaces.Repositories;
using UserManagement.Core.Interfaces.Services;
using UserManagement.Repository.Implementations;
using UserManagement.Service.Implementations;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    });

// CORS policy (allow any origin)
const string FrontendCorsPolicy = "FrontendCors";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: FrontendCorsPolicy, policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Register DI
// Use singleton for in-memory repository so data persists across requests
builder.Services.AddSingleton<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

// Swagger (optional, but useful in dev)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Only redirect to HTTPS outside of Development to avoid local 307s
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors(FrontendCorsPolicy);

app.UseAuthorization();

app.MapControllers();

app.Run();
