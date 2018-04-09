using FluentValidation;
using FluentValidation.Attributes;

namespace Service.ViewModels.Request
{
    [Validator(typeof(LoginRequestValidator))]
    public class LoginRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }

    public class LoginClient
    {
        public string Ip;
        public string HostName;
        public string UserAgent;
    }

    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator()
        {
            RuleFor(request => request.Password).NotEmpty().WithMessage("Password cannot be empty.");
            RuleFor(request => request.UserName).NotEmpty().WithMessage("User name cannot be empty.");
            RuleFor(request => request.Email).NotEmpty().WithMessage("ApplicationId cannot be empty.");
        }
    }
}
