using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Service.Services.Interfaces;
using Service.ViewModels.Request;

namespace Elearn.API.Controllers
{
    [RoutePrefix("api/Attachment")]
    public class AttachmentControler : ApiController
    {
        #region Contructor, Fields

        private readonly IAttachmentServices _attachmentServices;

        public AttachmentControler(IAttachmentServices attachmentServices)
        {
            _attachmentServices = attachmentServices;
        }

        #endregion

        #region
        [AcceptVerbs("GET", "POST")]
        [Route("Attachment/Update")]
        [HttpPost]
        public HttpResponseMessage UpdateAttachment(AttachmentRequest request)
        {
            try
            {
                var result = _attachmentServices.SaveAttachment(request);
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
        #endregion

    }
}
