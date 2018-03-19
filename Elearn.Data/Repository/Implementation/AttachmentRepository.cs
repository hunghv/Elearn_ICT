using Elearn.Data.Common;
using Elearn.Data.Entities;
using Elearn.Data.Repository.Base;
using Elearn.Data.Repository.Interfaces;

namespace Elearn.Data.Repository.Implementation
{
    public class AttachmentRepository:EntityBaseRepository<Attachment>,IAttachmentRepository
    {
        public AttachmentRepository(ElearnContext context) : base(context)
        {
        }
    }
}
