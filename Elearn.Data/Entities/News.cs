using Elearn.Data.Entities.Base;

namespace Elearn.Data.Entities
{
    public class News : Entity
    {
        public string Title { get; set; }
        public string Image { get; set; }
        public System.DateTime PostedDate { get; set; }
        public bool Available { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public string Content { get; set; }
        public string PostBy { get; set; }
        public virtual Categories Category { get; set; }
    }
}
