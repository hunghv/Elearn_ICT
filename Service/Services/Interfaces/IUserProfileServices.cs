using Service.ViewModels.Request;

namespace Service.Services.Interfaces
{
    public interface IUserProfileServices
    {
        #region UserProfile

        bool SignUp(LoginRequest request);

        #endregion
    }
}
