using FluentValidation;
using NoNeed2Ask.Api.Domain.Entities;

namespace NoNeed2Ask.Api.Features.Application.GetAllApplications;

public sealed class ApplicationListRequestDtoValidator : AbstractValidator<Application.ApplicationListRequestDto>
{
    private static readonly string[] AllowedSortBy = ["company", "role", "status", "lastUpdated"];

    private static readonly string[] AllowedSortDirections = ["asc", "desc"];

    public ApplicationListRequestDtoValidator()
    {
        RuleFor(x => x.Page)
            .GreaterThanOrEqualTo(1)
            .When(x => x.Page.HasValue);

        RuleForEach(x => x.Status)
            .NotEmpty()
            .Must(ApplicationStatuses.All.Contains)
            .WithMessage("Status must be one of: " + string.Join(", ", ApplicationStatuses.All));

        RuleFor(x => x.Search)
            .MaximumLength(200);

        RuleFor(x => x.SortBy)
            .Must(sortBy => sortBy is null || AllowedSortBy.Contains(sortBy))
            .WithMessage("SortBy must be one of: " + string.Join(", ", AllowedSortBy));

        RuleFor(x => x.SortDirection)
            .Must(sortDirection => sortDirection is null || AllowedSortDirections.Contains(sortDirection))
            .WithMessage("SortDirection must be one of: " + string.Join(", ", AllowedSortDirections));
    }
}