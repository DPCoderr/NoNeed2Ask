using System.Security.Claims;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NoNeed2Ask.Api.Database;
using NoNeed2Ask.Api.Features.Application;
using NoNeed2Ask.Api.Tests.Support;

namespace NoNeed2Ask.Api.Tests;

public sealed class ApplicationMalformedIdentityTests
{
    [Fact]
    public async Task List_ReturnsUnauthorized_WhenUserIdClaimIsMalformed()
    {
        await AssertUnauthorizedAsync(async dbContext =>
            (IResult)await ApplicationList.Handle(
                new ApplicationListRequestDto(),
                dbContext,
                MalformedPrincipal(),
                CancellationToken.None));
    }

    [Fact]
    public async Task Create_ReturnsUnauthorized_WhenUserIdClaimIsMalformed()
    {
        await AssertUnauthorizedAsync(async dbContext =>
            (IResult)await ApplicationCreate.Handle(
                ValidCreateRequest(),
                dbContext,
                MalformedPrincipal(),
                CancellationToken.None));
    }

    [Fact]
    public async Task GetById_ReturnsUnauthorized_WhenUserIdClaimIsMalformed()
    {
        await AssertUnauthorizedAsync(async dbContext =>
            (IResult)await ApplicationGetById.Handle(
                Guid.NewGuid(),
                dbContext,
                MalformedPrincipal(),
                CancellationToken.None));
    }

    [Fact]
    public async Task Update_ReturnsUnauthorized_WhenUserIdClaimIsMalformed()
    {
        await AssertUnauthorizedAsync(async dbContext =>
            (IResult)await ApplicationUpdate.Handle(
                Guid.NewGuid(),
                ValidUpdateRequest(),
                dbContext,
                MalformedPrincipal(),
                CancellationToken.None));
    }

    [Fact]
    public async Task Delete_ReturnsUnauthorized_WhenUserIdClaimIsMalformed()
    {
        await AssertUnauthorizedAsync(async dbContext =>
            (IResult)await ApplicationDelete.Handle(
                Guid.NewGuid(),
                dbContext,
                MalformedPrincipal(),
                CancellationToken.None));
    }

    private static async Task AssertUnauthorizedAsync(Func<AppDbContext, Task<IResult>> act)
    {
        await using var dbContext = CreateDbContext();
        var result = await act(dbContext);
        var httpContext = new DefaultHttpContext();
        httpContext.RequestServices = new ServiceCollection()
            .AddLogging()
            .AddProblemDetails()
            .BuildServiceProvider();

        await result.ExecuteAsync(httpContext);

        httpContext.Response.StatusCode.Should().Be(StatusCodes.Status401Unauthorized);
    }

    private static AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql("Host=localhost;Database=unused;Username=postgres;Password=postgres")
            .Options;

        return new AppDbContext(options);
    }

    private static ClaimsPrincipal MalformedPrincipal()
    {
        return new ClaimsPrincipal(new ClaimsIdentity(
            [new Claim(ClaimTypes.NameIdentifier, "not-a-guid")],
            authenticationType: "Test"));
    }

    private static CreateApplicationRequestDto ValidCreateRequest()
    {
        var request = ApiTestHelpers.ValidApplicationRequest();

        return new CreateApplicationRequestDto(
            request.CompanyName,
            request.JobTitle,
            request.Status,
            request.PublicNote,
            request.PrivateNote,
            request.LastContactAt,
            request.NextActionAt);
    }

    private static UpdateApplicationRequestDto ValidUpdateRequest()
    {
        var request = ApiTestHelpers.ValidApplicationRequest();

        return new UpdateApplicationRequestDto(
            request.CompanyName,
            request.JobTitle,
            request.Status,
            request.PublicNote,
            request.PrivateNote,
            request.LastContactAt,
            request.NextActionAt);
    }
}
