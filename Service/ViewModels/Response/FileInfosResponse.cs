using Service.Common;

namespace Service.ViewModels.Response
{
    public class FileInfosResponse
    {
        public int Id { get; set; }
        public bool IsSuccess { get; set; }
        public string FileName { get; set; }
        public string Extension { get; set; }
        public string Mime { get; set; }
        public decimal FileSize { get; set; }
        public decimal Size
        {
            get
            {
                return FileHelper.GetKylobyte((long)FileSize);
            }
        }
    }
}
