using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Service.Common;
using Service.Services.Interfaces;
using Service.ViewModels.Request;

namespace Elearn.API.Controllers
{
    [RoutePrefix("api/Admin")]
    public class AdminController : ApiController
    {
        #region Contructor, Fields

        private readonly IAdminServices _adminServices;

        public AdminController(IAdminServices adminServices)
        {
            _adminServices = adminServices;
        }

        #endregion

        #region Categories

        [Route("Categories/GetAllCategories")]
        [HttpGet]
        public HttpResponseMessage GetAllCategories([FromUri] CategoriesRequest request)
        {
            try
            {
                var users = _adminServices.GetCategories(request);
                return users != null ? Request.CreateResponse(HttpStatusCode.OK, users) :
                    Request.CreateResponse(HttpStatusCode.NoContent, Constants.ErrorMessageCodes.NoRecordsFoundMessage);
            }
            catch (Exception exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
            }
        }


        #endregion
    }
}
