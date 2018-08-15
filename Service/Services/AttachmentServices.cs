using AutoMapper;
using Elearn.Data.Entities;
using Elearn.Data.Repository.Interfaces;
using Service.Services.Interfaces;
using Service.ViewModels.Request;

namespace Service.Services
{
    public class AttachmentServices : Common.PaggingHelper, IAttachmentServices
    {
        #region Declare Property

        private readonly IAttachmentRepository _attachmentRepository;

        #endregion

        #region Constructure

        public AttachmentServices(IAttachmentRepository attachmentRepository)
        {
            _attachmentRepository = attachmentRepository;
        }

        #endregion

        #region
        public int SaveAttachment(AttachmentRequest _request)
        {
            var entity = Mapper.Map<AttachmentRequest, Attachment>(_request);
            entity.IsDeleted = false;
            entity.CreatedBy = 1;
            entity.CreatedDate = System.DateTime.Now;
            entity.Remark = "None";
            entity.ReportId = 1;
            entity.ModifiedBy = 1;
            entity.ModifiedDate = System.DateTime.Now;
            _attachmentRepository.Add(entity);
            if (_attachmentRepository.Commit())
            {
                return entity.Id;
            }
            else
            {
                return 0;
            }
            
        }
        #endregion
    }
}
