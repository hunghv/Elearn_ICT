using System;

namespace Service.ViewModels.Request
{
    public class NewsRequest
    {
        public  int Id { get; set; }
        public string Title { get; set; }
        public int ImageId { get; set; }
        public DateTime PostedDate { get; set; }
        public DateTime? PublicDate { get; set; }
        public bool Available { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public int StatusId { get; set; }
        public string Content { get; set; }
        public int PostedBy { get; set; }
    }
}
