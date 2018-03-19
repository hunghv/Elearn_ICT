using System.Collections.Generic;
using Elearn.Data.Entities.Base;

namespace Elearn.Data.Entities
{
    public class NewsComment : Entity
    {
        public NewsComment()
        {
            ChildComments = new List<NewsComment>();
        }

        public int NewsId { get; set; }
        public int? ParentCommentId { get; set; }
        public string Comment { get; set; }
        public int UserProfileId { get; set; }

        public virtual News News { get; set; }
        public ICollection<NewsComment> ChildComments { get; set; }
        public virtual News ParentComment { get; set; }
        public virtual UserProfile UserProfile { get; set; }
    }

}

