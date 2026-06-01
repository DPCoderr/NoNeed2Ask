using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using NoNeed2Ask.Api.Database;
using NoNeed2Ask.Api.Features;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddDatabaseServices(builder.Configuration);
builder.Services.AddFeatureServices();
builder.Services.AddAuthorization();
builder.Services.AddProblemDetails();
builder.Services.AddOpenApi();
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownIPNetworks.Clear();
    options.KnownProxies.Clear();
});

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("Frontend", policy =>
//     {
//         policy
//             .WithOrigins(
//                 "https://your-frontend-domain.com",
//                 "http://localhost:5173")
//             .AllowAnyHeader()
//             .AllowAnyMethod()
//             .AllowCredentials();
//     });
// });

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}

app.UseForwardedHeaders();

app.MapOpenApi();
app.MapScalarApiReference();

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapDefaultEndpoints();
app.MapFeatureEndpoints();

app.Run();
