using Elearn.Data.Common;
using Elearn.Data.Entities;
using Elearn.Data.Repository.Base;
using Elearn.Data.Repository.Interfaces;

namespace Elearn.Data.Repository.Implementation
{
    public class RoleRepository : EntityBaseRepository<Role>,IRoleRepository
    {
        public RoleRepository(ElearnContext context) : base(context)
        {
        }
    }
}
