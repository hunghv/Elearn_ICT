using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Elearn.Data.Entities.Base;

namespace Elearn.Data.Entities
{
    public class Role : Entity
    {
        public Role()
        {
            UserRoles = new List<UserRole>();
        }

        [MaxLength(256)]
        public string Name { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }
    }

}
