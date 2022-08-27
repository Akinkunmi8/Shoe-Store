using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ShopCart.Context;
using ShopCart.Entities;
using ShopCart.Middleware;
using ShopCart.Services;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddDbContext<StoreContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("Conn")));
builder.Services.AddCors();
builder.Services.AddIdentityCore<User>(opt => {
    opt.Password.RequireNonAlphanumeric = true;
    opt.User.RequireUniqueEmail = true;
    opt.SignIn.RequireConfirmedEmail=true;
})
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<StoreContext>();
// Register Authentication and validateion of token key
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(opt => {
            opt.TokenValidationParameters = new TokenValidationParameters{

                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("JWTSettings: TokenKey"))
            };
        });
builder.Services.AddAuthorization();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
// configure swagger header
builder.Services.AddSwaggerGen(c => {
    c.SwaggerDoc("v1", new OpenApiInfo{Title = "API", Version = "v1"});
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme{
        Description = "Jwt auth header",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement{
        {
            new OpenApiSecurityScheme{
                Reference = new OpenApiReference{
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});
builder.Services.AddScoped<TokenServices>();

var app = builder.Build();
// regesiter our seeder class
using (var scope = app.Services.CreateScope())
{
    var contex = scope.ServiceProvider.GetRequiredService<StoreContext>();

    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    try
    {
        contex.Database.Migrate();
        DbInitializer.Initialize(contex);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Problem migrating data");
    }
}
app.UseMiddleware<ExceptionMiddleware>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
}

app.UseHttpsRedirection();
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
