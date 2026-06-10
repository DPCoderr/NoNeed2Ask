using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using NoNeed2Ask.Api.Database;
using DomainApplication = NoNeed2Ask.Api.Domain.Entities.Application;

namespace NoNeed2Ask.Api.Features.Application;

public static class ApplicationList
{
    private const int PageSize = 10;

    public static async Task<Results<Ok<ApplicationListResponseDto>, ProblemHttpResult>> Handle(
        [AsParameters] ApplicationListRequestDto request,
        AppDbContext dbContext,
        ClaimsPrincipal principal,
        CancellationToken cancellationToken
    )
    {
        var userIdString = principal.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!Guid.TryParse(userIdString, out var userId))
        {
            return TypedResults.Problem(
                title: "Unauthorized",
                detail: "You must be logged in to see this page",
                statusCode: 401
            );
        }

        var page = request.Page ?? 1;
        var sortBy = request.SortBy ?? "lastUpdated";
        var sortDirection = request.SortDirection ?? "desc";

        // Build the query first so filtering, counting, sorting, and paging all use the same scope.
        var applicationsQuery = dbContext.Applications
            .AsNoTracking()
            .Where(a => a.UserId == userId);

        if (request.Status is { Length: > 0 })
        {
            applicationsQuery = applicationsQuery.Where(a => request.Status.Contains(a.Status));
        }

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            // The % wildcards mean "contains this text anywhere", not just at the start.
            var searchPattern = $"%{request.Search.Trim()}%";

            // ILike keeps the search case-insensitive for PostgreSQL.
            applicationsQuery = applicationsQuery.Where(a =>
                EF.Functions.ILike(a.CompanyName, searchPattern) ||
                EF.Functions.ILike(a.JobTitle, searchPattern));
        }

        // Count before paging so the response can include full pagination metadata.
        var totalItems = await applicationsQuery.CountAsync(cancellationToken);
        var totalPages = (int)Math.Ceiling(totalItems / (double)PageSize);
        var skip = (page - 1) * PageSize;

        var applicationList = await applicationsQuery
            .OrderByRequest(sortBy, sortDirection)
            .Skip(skip)
            .Take(PageSize)
            .Select(a => new ApplicationResponseDto(
                a.Id,
                a.CompanyName,
                a.JobTitle,
                a.Status,
                a.PublicNote,
                a.PrivateNote,
                a.LastContactAt,
                a.NextActionAt,
                a.CreatedAt,
                a.UpdatedAt
            ))
            .ToListAsync(cancellationToken);

        return TypedResults.Ok(new ApplicationListResponseDto(
            applicationList,
            page,
            PageSize,
            totalItems,
            totalPages));
    }

    // The needed OrderBy() filtered in a switch function 
    private static IOrderedQueryable<DomainApplication> OrderByRequest(
        this IQueryable<DomainApplication> query,
        string sortBy,
        string sortDirection)
    {
        return (sortBy, sortDirection) switch
        {
            ("company", "asc") => query.OrderBy(a => a.CompanyName).ThenBy(a => a.Id),
            ("company", "desc") => query.OrderByDescending(a => a.CompanyName).ThenBy(a => a.Id),
            ("role", "asc") => query.OrderBy(a => a.JobTitle).ThenBy(a => a.Id),
            ("role", "desc") => query.OrderByDescending(a => a.JobTitle).ThenBy(a => a.Id),
            ("status", "asc") => query.OrderBy(a => a.Status).ThenBy(a => a.Id),
            ("status", "desc") => query.OrderByDescending(a => a.Status).ThenBy(a => a.Id),
            ("lastUpdated", "asc") => query.OrderBy(a => a.UpdatedAt).ThenBy(a => a.Id),
            _ => query.OrderByDescending(a => a.UpdatedAt).ThenBy(a => a.Id)
        };
    }
}
