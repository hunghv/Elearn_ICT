using System;
using System.Collections.Generic;
using Elearn.Data.Entities;

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
        public int CategoryId { get; set; }
        public int StatusId { get; set; }
        public string Content { get; set; }
        public int PostedBy { get; set; }
        public int LikeCount { get; set; }
        public int LikeShared { get; set; }
        public List<CommentView> LstComment { get; set; }
    }

    public class CommentView
    {
        public string Comment { get; set; }
        public UserProfileResponse User { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
