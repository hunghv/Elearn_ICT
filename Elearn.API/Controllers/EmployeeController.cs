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
    public class EmployeeController : ApiController
    {
        #region Contructor, Fields

        private readonly IEmployeeServices _employeeServices;

        public EmployeeController(IEmployeeServices employeeServices)
        {
            _employeeServices = employeeServices;
        }

        #endregion

        #region employees
        [Route("Employee/GetAllemployes")]
        [HttpGet]
        public HttpResponseMessage GetAllemployes()
        {
            try
            {
                var users = _employeeServices.GetEmployees();
                return users != null ? Request.CreateResponse(HttpStatusCode.OK, users) :
                    Request.CreateResponse(HttpStatusCode.NoContent, Constants.ErrorMessageCodes.NoRecordsFoundMessage);
            }
            catch (Exception exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
            }
        }
        //        [Route("Categories/GetAllCategories")]
        //        [HttpPost]
        //        public HttpResponseMessage GetAllCategories(CategoriesRequest request)
        //        {
        //            try
        //            {
        //                var users = _adminServices.GetCategories(request);
        //                return users != null ? Request.CreateResponse(HttpStatusCode.OK, users) :
        //                    Request.CreateResponse(HttpStatusCode.NoContent, Constants.ErrorMessageCodes.NoRecordsFoundMessage);
        //            }
        //            catch (Exception exception)
        //            {
        //                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
        //            }
        //        }
        //        // public HttpResponseMessage UpdateCategories(CategoriesSaveRequest request,int id,int type)
        //        [Route("Categories/Update")]
        //        [HttpPost]
        //        public HttpResponseMessage UpdateCategories(CategoriesSaveRequest request)
        //        {
        //            try
        //            {
        //                var result = _adminServices.SaveCategories(request);
        //                if (result != null)
        //                {
        //                    return Request.CreateResponse(HttpStatusCode.OK, new { results = result });
        //                }
        //                return Request.CreateResponse(HttpStatusCode.NotModified, false);
        //            }
        //            catch (Exception exception)
        //            {
        //                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
        //            }
        //        }
        //
        //        [Route("Categories/Delete")]
        //        [HttpPost]
        //        public HttpResponseMessage DeleteCategories(int id)
        //        {
        //            try
        //            {
        //                var result = _adminServices.DeleteCategories(id);
        //                if (result)
        //                {
        //                    return Request.CreateResponse(HttpStatusCode.OK, new { results = true });
        //                }
        //                return Request.CreateResponse(HttpStatusCode.NotModified, new { results = false });
        //            }
        //            catch (Exception exception)
        //            {
        //                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
        //            }
        //        }

        #endregion
    }
}
