using Elearn.Data.Entities.Base;

namespace Elearn.Data.Entities
{
    public class Like : Entity
    {
        public int UserId { get; set; }
        public int NewsId { get; set; }
        public virtual UserProfile User { get; set; }
        public virtual News DocumentNews { get; set; }
    }
}
