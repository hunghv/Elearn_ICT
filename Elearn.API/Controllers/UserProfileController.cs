using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Service.Common;
using Service.Services.Interfaces;
using Service.ViewModels.Request;

namespace Elearn.API.Controllers
{
    [RoutePrefix("api/UserProfile")]
    public class UserProfileController : ApiController
    {
        #region Contructor

        private readonly IUserProfileServices _userProfileServices;

        public UserProfileController(IUserProfileServices userProfileServices)
        {
            _userProfileServices = userProfileServices;
        }

        #endregion

        #region UserProfile

        [Route("SignUp")]
        [HttpPost]
        public HttpResponseMessage SignUpUserProfile(LoginRequest request)
        {
            try
            {
                var result = _userProfileServices.SignUp(request);
                if (result)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, true);
                }
                return Request.CreateResponse(HttpStatusCode.NotModified, false);
            }
            catch (Exception exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
            }
        }

        [Route("Login")]
        [HttpGet]
        public HttpResponseMessage GetUserProfile([FromUri] LoginRequest request)
        {
            try
            {
                var users = _userProfileServices.Login(request);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
            }
        }

        #endregion
    }
}
