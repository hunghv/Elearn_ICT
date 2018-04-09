using Elearn.Data.Entities;
using Elearn.Data.Repository.Interfaces;
using Service.Common;
using Service.Services.Interfaces;
using Service.ViewModels.Request;

namespace Service.Services
{
    class UserProfileServices : IUserProfileServices
    {
        #region Declare Property

        private readonly IUserProfileRepository _userProfileRepository;

        public UserProfileServices(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        #endregion

        #region Public Method

        //Sign up
        public bool SignUp(LoginRequest request)
        {
            var emails = _userProfileRepository.GetSingleNoneDeleted(x => x.Email == request.Email);
            if (emails != null)
            {
                return false;
            }
            //add new
            var newUserProfile = new UserProfile
            {
                UserName = request.UserName,
                Email = request.Email,
                Password = CryptoMd5.Encode(request.Password),
                CreatedBy = Constants.GetUserId(),
                ModifiedBy = Constants.GetUserId(),
                CreatedDate = Constants.GetDateNow(),
                ModifiedDate = Constants.GetDateNow()
            };
            _userProfileRepository.Add(newUserProfile);
            return _userProfileRepository.Commit();
        }

        #endregion
    }
}
