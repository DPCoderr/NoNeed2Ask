using FluentAssertions;
using NoNeed2Ask.Api.Features.Auth;
using NoNeed2Ask.Api.Tests.Support;

namespace NoNeed2Ask.Api.Tests;

public sealed class AuthValidatorTests
{
    [Fact]
    public void RegisterRequestValidator_Passes_ForValidRequest()
    {
        var validator = new RegisterRequestValidator();
        var request = new Register.RegisterRequest(
            "valid-user",
            "valid@example.test",
            ApiTestHelpers.ValidPassword,
            RememberMe: false);

        var result = validator.Validate(request);

        result.IsValid.Should().BeTrue();
    }

    [Theory]
    [InlineData("", "valid@example.test", ApiTestHelpers.ValidPassword, "Username")]
    [InlineData("valid-user", "not-an-email", ApiTestHelpers.ValidPassword, "Email")]
    [InlineData("valid-user", "valid@example.test", "Aa1!", "Password")]
    [InlineData("valid-user", "valid@example.test", "Password!", "Password")]
    [InlineData("valid-user", "valid@example.test", "PASSWORD1!", "Password")]
    [InlineData("valid-user", "valid@example.test", "password1!", "Password")]
    [InlineData("valid-user", "valid@example.test", "Password1", "Password")]
    public void RegisterRequestValidator_Fails_ForInvalidRequest(
        string username,
        string email,
        string password,
        string expectedProperty)
    {
        var validator = new RegisterRequestValidator();
        var request = new Register.RegisterRequest(username, email, password, RememberMe: false);

        var result = validator.Validate(request);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(error => error.PropertyName == expectedProperty);
    }

    [Fact]
    public void LoginRequestDtoValidator_Passes_ForValidRequest()
    {
        var validator = new LoginRequestDtoValidator();
        var request = new Login.LoginRequestDto("valid@example.test", ApiTestHelpers.ValidPassword, RememberMe: false);

        var result = validator.Validate(request);

        result.IsValid.Should().BeTrue();
    }

    [Theory]
    [InlineData("", ApiTestHelpers.ValidPassword, "Email")]
    [InlineData("not-an-email", ApiTestHelpers.ValidPassword, "Email")]
    [InlineData("valid@example.test", "", "Password")]
    public void LoginRequestDtoValidator_Fails_ForInvalidRequest(
        string email,
        string password,
        string expectedProperty)
    {
        var validator = new LoginRequestDtoValidator();
        var request = new Login.LoginRequestDto(email, password, RememberMe: false);

        var result = validator.Validate(request);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(error => error.PropertyName == expectedProperty);
    }
}
