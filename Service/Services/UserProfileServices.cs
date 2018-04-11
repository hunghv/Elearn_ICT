using System;
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
    }
}
