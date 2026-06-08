using FluentAssertions;
using NoNeed2Ask.Api.Domain.Entities;
using NoNeed2Ask.Api.Features.Application;
using NoNeed2Ask.Api.Tests.Support;

namespace NoNeed2Ask.Api.Tests;

public sealed class ApplicationValidatorTests
{
    [Fact]
    public void CreateApplicationRequestDtoValidator_Passes_ForValidRequest()
    {
        var validator = new CreateApplicationRequestDtoValidator();
        var request = ToCreateRequest(ApiTestHelpers.ValidApplicationRequest());

        var result = validator.Validate(request);

        result.IsValid.Should().BeTrue();
    }

    [Fact]
    public void CreateApplicationRequestDtoValidator_AllowsNullableOptionalFields()
    {
        var validator = new CreateApplicationRequestDtoValidator();
        var request = ToCreateRequest(ApiTestHelpers.ValidApplicationRequest(
            publicNote: null,
            privateNote: null,
            lastContactAt: null,
            nextActionAt: null));

        var result = validator.Validate(request);

        result.IsValid.Should().BeTrue();
    }

    [Theory]
    [MemberData(nameof(InvalidCreateRequests))]
    public void CreateApplicationRequestDtoValidator_Fails_ForInvalidRequest(
        CreateApplicationRequestDto request,
        string expectedProperty)
    {
        var validator = new CreateApplicationRequestDtoValidator();

        var result = validator.Validate(request);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(error => error.PropertyName == expectedProperty);
    }

    [Fact]
    public void UpdateApplicationRequestDtoValidator_Passes_ForValidRequest()
    {
        var validator = new UpdateApplicationRequestDtoValidator();
        var request = ToUpdateRequest(ApiTestHelpers.ValidApplicationRequest());

        var result = validator.Validate(request);

        result.IsValid.Should().BeTrue();
    }

    [Theory]
    [MemberData(nameof(InvalidUpdateRequests))]
    public void UpdateApplicationRequestDtoValidator_Fails_ForInvalidRequest(
        UpdateApplicationRequestDto request,
        string expectedProperty)
    {
        var validator = new UpdateApplicationRequestDtoValidator();

        var result = validator.Validate(request);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(error => error.PropertyName == expectedProperty);
    }

    public static TheoryData<CreateApplicationRequestDto, string> InvalidCreateRequests()
    {
        return new TheoryData<CreateApplicationRequestDto, string>
        {
            { ToCreateRequest(ApiTestHelpers.ValidApplicationRequest(companyName: "")), "CompanyName" },
            { ToCreateRequest(ApiTestHelpers.ValidApplicationRequest(companyName: new string('c', 201))), "CompanyName" },
            { ToCreateRequest(ApiTestHelpers.ValidApplicationRequest(jobTitle: "")), "JobTitle" },
            { ToCreateRequest(ApiTestHelpers.ValidApplicationRequest(jobTitle: new string('j', 201))), "JobTitle" },
            { ToCreateRequest(ApiTestHelpers.ValidApplicationRequest(status: "")), "Status" },
            { ToCreateRequest(ApiTestHelpers.ValidApplicationRequest(status: "not_a_status")), "Status" },
            { ToCreateRequest(ApiTestHelpers.ValidApplicationRequest(status: new string('s', 65))), "Status" },
            { ToCreateRequest(ApiTestHelpers.ValidApplicationRequest(publicNote: new string('p', 2001))), "PublicNote" },
            { ToCreateRequest(ApiTestHelpers.ValidApplicationRequest(privateNote: new string('p', 4001))), "PrivateNote" }
        };
    }

    public static TheoryData<UpdateApplicationRequestDto, string> InvalidUpdateRequests()
    {
        return new TheoryData<UpdateApplicationRequestDto, string>
        {
            { ToUpdateRequest(ApiTestHelpers.ValidApplicationRequest(companyName: "")), "CompanyName" },
            { ToUpdateRequest(ApiTestHelpers.ValidApplicationRequest(companyName: new string('c', 201))), "CompanyName" },
            { ToUpdateRequest(ApiTestHelpers.ValidApplicationRequest(jobTitle: "")), "JobTitle" },
            { ToUpdateRequest(ApiTestHelpers.ValidApplicationRequest(jobTitle: new string('j', 201))), "JobTitle" },
            { ToUpdateRequest(ApiTestHelpers.ValidApplicationRequest(status: "")), "Status" },
            { ToUpdateRequest(ApiTestHelpers.ValidApplicationRequest(status: "not_a_status")), "Status" },
            { ToUpdateRequest(ApiTestHelpers.ValidApplicationRequest(status: new string('s', 65))), "Status" },
            { ToUpdateRequest(ApiTestHelpers.ValidApplicationRequest(publicNote: new string('p', 2001))), "PublicNote" },
            { ToUpdateRequest(ApiTestHelpers.ValidApplicationRequest(privateNote: new string('p', 4001))), "PrivateNote" }
        };
    }

    private static CreateApplicationRequestDto ToCreateRequest(TestApplicationRequest request)
    {
        return new CreateApplicationRequestDto(
            request.CompanyName,
            request.JobTitle,
            request.Status,
            request.PublicNote,
            request.PrivateNote,
            request.LastContactAt,
            request.NextActionAt);
    }

    private static UpdateApplicationRequestDto ToUpdateRequest(TestApplicationRequest request)
    {
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
