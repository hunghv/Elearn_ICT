using System;
using System.Collections.Generic;

namespace Service.ViewModels.Response
{
    public class NewsResponse
    {
        public string Title { get; set; }
        public int ImageId { get; set; }
        public DateTime PostedDate { get; set; }
        public DateTime? PublicDate { get; set; }
        public bool Available { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public string Content { get; set; }
        public string PostedBy { get; set; }
        public int LikeCount { get; set; }
        public int SharedCount { get; set; }
        public List<CommentView> LstComment { get; set; }
    }

    public class CommentView
    {
        public string Comment { get; set; }
        public UserProfileResponse User { get; set; }
        public DateTime CreatedDate { get; set; }
        public int LikeCount { get; set; }
        public int SharedCount { get; set; }
    }
}
