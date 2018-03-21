using Service.Common;

namespace Service.ViewModels.Request
{
    public class FileInfosRequest
    {
        public int? Id { get; set; }
        public int? DocumentId { get; set; }
        public string FileName { get; set; }
        public string Extension { get; set; }
        public string Mime { get; set; }
        public byte[] Attachment { get; set; }
        public int FileLength { get; set; }

        public decimal FileSize
        {
            get { return GetSize(); }
        }

        private decimal GetSize()
        {
            return FileHelper.GetMegabyte(FileLength);
        }
    }
}
