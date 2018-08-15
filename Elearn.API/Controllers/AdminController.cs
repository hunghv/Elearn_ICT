using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Service.Common;
using Service.Services.Interfaces;
using Service.ViewModels.Request;
using System.IO;

namespace Elearn.API.Controllers
{

    [RoutePrefix("api/Admin")]
    public class AdminController : ApiController
    {
        #region Contructor, Fields
        private readonly IAttachmentServices _attachmentServices;
        private readonly IAdminServices _adminServices;

        public AdminController(IAdminServices adminServices, IAttachmentServices attachmentServices)
        {
            _adminServices = adminServices;
            _attachmentServices = attachmentServices;
        }

        #endregion

        #region Categories

        [Route("Attachment/Update")]
        [HttpPost]
        public HttpResponseMessage UpdateAttachment(AttachmentRequest request)
        {
            try
            {
                var request1 = new AttachmentRequest();
                var httpPostedFile = System.Web.HttpContext.Current.Request.Files["file"];
                var data = System.Web.HttpContext.Current.Request.Params["file"];
                if (httpPostedFile!=null)
                {
                    request1.AttachmentFile = ReadFully(httpPostedFile.InputStream);
                    request1.AttachmentName = httpPostedFile.FileName;
                    request1.AttachmentLength = httpPostedFile.ContentLength;
                    request1.AttachmentType = httpPostedFile.ContentType;
                }
                
                var result = _attachmentServices.SaveAttachment(request1);
                if (result != 0)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { results = result });
                }
                return Request.CreateResponse(HttpStatusCode.NotModified, false);
            }
            catch (Exception exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
            }
        }
        [Route("Categories/GetAllCategories")]
        [HttpPost]
        public HttpResponseMessage GetAllCategories(CategoriesRequest request)
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
        // public HttpResponseMessage UpdateCategories(CategoriesSaveRequest request,int id,int type)
        [Route("Categories/Update")]
        [HttpPost]
        public HttpResponseMessage UpdateCategories(CategoriesSaveRequest request)
        {
            try
            {
                var result = _adminServices.SaveCategories(request);
                if (result != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { results = result });
                }
                return Request.CreateResponse(HttpStatusCode.NotModified, false);
            }
            catch (Exception exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
            }
        }

        [Route("Categories/Delete")]
        [HttpPost]
        public HttpResponseMessage DeleteCategories(int id)
        {
            try
            {
                var result = _adminServices.DeleteCategories(id);
                if (result)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new  {results = true });
                }
                return Request.CreateResponse(HttpStatusCode.NotModified, new { results = false });
            }
            catch (Exception exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
            }
        }

        #endregion

        #region Country

        [Route("Country/GetAllCountries")]
        [HttpGet]
        public HttpResponseMessage GetAllCountries([FromUri] CountryRequest request)
        {
            try
            {
                var users = _adminServices.GetCountrys(request);
                return users != null ? Request.CreateResponse(HttpStatusCode.OK, users) :
                    Request.CreateResponse(HttpStatusCode.NoContent, Constants.ErrorMessageCodes.NoRecordsFoundMessage);
            }
            catch (Exception exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
            }
        }

        [Route("Country/Update")]
        [HttpPost]
        public HttpResponseMessage UpdateCountries(CountrySaveRequest request)
        {
            try
            {
                var result = _adminServices.UpdateCountrys(request);
                if (result != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
                return Request.CreateResponse(HttpStatusCode.NotModified, false);
            }
            catch (Exception exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
            }
        }


        [Route("Country/Delete")]
        [HttpPost]
        public HttpResponseMessage DeleteCountries(int id)
        {
            try
            {
                var result = _adminServices.DeleteCountries(id);
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
        #endregion

        #region
        public static byte[] ReadFully(Stream input)
        {
            byte[] buffer = new byte[16 * 1024];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }
        #endregion
    }
}
