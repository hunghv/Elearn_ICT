using System;
using Elearn.Data.Entities.Base;

namespace Elearn.Data.Entities
{
    public class UserLoginHistory : Entity
    {
        public int UserId { get; set; }
        public virtual UserProfile User { get; set; }
        public Guid AccessToken { get; set; }
        public bool IsLoggedOut { get; set; }
        public bool IsAppToken { get; set; }
    }
}
