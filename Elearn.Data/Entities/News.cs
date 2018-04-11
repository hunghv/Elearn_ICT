using System;
using System.Collections.Generic;
using Elearn.Data.Entities.Base;

namespace Elearn.Data.Entities
{
    public class News : Entity
    {
        public News()
        {
            SharedNews = new List<ShareNews>();
            NewsLike = new List<Like>();
            NewsComments = new List<NewsComment>();
        }
        public string Title { get; set; }
        public int ImageId { get; set; }
        public DateTime PostedDate { get; set; }
        public DateTime? PublicDate { get; set; }
        public bool Available { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public int StatusId { get; set; }
        public string Content { get; set; }
        public int PostedById { get; set; }
        public UserProfile PostedBy { get; set; }
        public virtual Categories Category { get; set; }
        public virtual Status Status { get; set; }
        public virtual CoverImage Image { get; set; }

        public ICollection<ShareNews> SharedNews { get; set; }
        public ICollection<NewsComment> NewsComments { get; set; }
        public ICollection<Like> NewsLike { get; set; }
    }
}
