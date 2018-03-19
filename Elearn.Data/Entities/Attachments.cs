using Elearn.Data.Entities.Base;

namespace Elearn.Data.Entities
{
    public  class Attachment : Entity
    {
        public int? ReportId { get; set; }
        public byte[] AttachmentFile { get; set; }
        public string AttachmentName { get; set; }
        public string AttachmentType { get; set; }
        public int AttachmentLength { get; set; }
        public string Remark { get; set; }
    }
}
