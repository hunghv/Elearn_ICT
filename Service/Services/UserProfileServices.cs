using System;
using System.Runtime.CompilerServices;
using Elearn.Data.Entities;
using Elearn.Data.Repository.Interfaces;
using Service.Common;
using Service.Services.Interfaces;
using Service.ViewModels.Request;
using Service.ViewModels.Validator;

namespace Service.Services
{
    public class UserProfileServices : IUserProfileServices
    {
        #region Declare Property

        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IUserLoginHistoryRepository _userLoginHistoryRepository;

        public UserProfileServices(IUserProfileRepository userProfileRepository, IUserLoginHistoryRepository userLoginHistoryRepository)
        {
            _userProfileRepository = userProfileRepository;
            _userLoginHistoryRepository = userLoginHistoryRepository;
        }

        #endregion

        #region Public Method

        #region Sign Up
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
            var isOk = _userProfileRepository.Commit();
            if (isOk)
            {
                try
                {
                    //get mail template to send
                    var email = new EmailViewModel
                    {
                        From = "Web Master <System.edu@gmail.com>",
                        Body = "inspectionPackFunc.openFormAddNewInspectionLocationDefinition('5133991c-192b-4154-9f26-9ab9cbfb89ad','f459d32e-adfc-460f-b00e-d36703f8f69c')",
                        To = newUserProfile.Email,
                        Cc = "hunghvhpu@gmail.com",
                        Subject = "test mail",
                        Bcc = "",
                        Attachments = ""
                    };
                    XMail.Send(email);
                }
                catch (Exception)
                {
                    // ignored
                }
            }
            return isOk;
        }
        #endregion

        #region Login

        public Guid? Login(LoginRequest request)
        {
            var email = _userProfileRepository.GetSingleNoneDeleted(x => x.Email == request.Email);
            var pwd = CryptoMd5.Encode(request.Password);
            if (email != null && pwd == email.Password)
            {
                var newUserLoginHistory = new UserLoginHistory
                {
                    UserId = Constants.GetUserId(),
                    AccessToken = Guid.NewGuid(),
                    IsAppToken = true,
                    IsLoggedOut = false,
                    CreatedBy = Constants.GetUserId(),
                    ModifiedBy = Constants.GetUserId(),
                    CreatedDate = Constants.GetDateNow(),
                    ModifiedDate = Constants.GetDateNow()
                };
                _userLoginHistoryRepository.Add(newUserLoginHistory);
                _userLoginHistoryRepository.Commit();
                return newUserLoginHistory.AccessToken;
            }
            return null;
        }
        #endregion

        #region Logout

        public bool Logout(Guid guid)
        {
            var userLoginHistory = _userLoginHistoryRepository.GetSingleNoneDeleted(history => history.AccessToken == guid);
            if (userLoginHistory != null)
            {

                userLoginHistory.IsLoggedOut = true;
                userLoginHistory.CreatedBy = Constants.GetUserId();
                userLoginHistory.ModifiedBy = Constants.GetUserId();
                userLoginHistory.CreatedDate = Constants.GetDateNow();
                userLoginHistory.ModifiedDate = Constants.GetDateNow();
                _userLoginHistoryRepository.Update(userLoginHistory);
                _userLoginHistoryRepository.Commit();
                return true;
            }
            return false;
        }

        #endregion

        #region Update ProfileUser

        public int? UpdateProfileUser(userProfileUpdateRequest request)
        {
            if (request.Id != null)
            {
                var userProfile = _userProfileRepository.GetSingleNoneDeleted(x => x.Id == request.Id);
                //update
                if (userProfile != null)
                {
                    userProfile.CountryId = request.CountryId;
                    userProfile.DisplayName = request.DisplayName;
                    userProfile.Password = request.Password;
                    userProfile.TelephoneNumber = request.TelephoneNumber;
                    userProfile.ThumbnailPhoto = request.ThumbnailPhoto;
                    userProfile.NickName = request.NickName;
                    userProfile.ModifiedDate = Constants.GetDateNow();
                    userProfile.ModifiedBy = Constants.GetUserId();
                    _userProfileRepository.Update(userProfile);
                    _userProfileRepository.Commit();
                }
                if (userProfile != null) return userProfile.Id;
            }
            return null;
        }

        #endregion

        #endregion
    }
}
