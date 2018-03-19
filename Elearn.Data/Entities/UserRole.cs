using Elearn.Data.Entities.Base;

namespace Elearn.Data.Entities
{
    public class UserRole : Entity
    {
        public int UserProfileId { get; set; }
        public int RoleId { get; set; }
        public virtual UserProfile UserProfile { get; set; }
        public virtual Role Role { get; set; }
    }
}
