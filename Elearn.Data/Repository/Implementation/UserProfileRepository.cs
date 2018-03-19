using Elearn.Data.Common;
using Elearn.Data.Entities;
using Elearn.Data.Repository.Base;
using Elearn.Data.Repository.Interfaces;

namespace Elearn.Data.Repository.Implementation
{
    public class UserProfileRepository:EntityBaseRepository<UserProfile>,IUserProfileRepository
    {
        public UserProfileRepository(ElearnContext context) : base(context)
        {
        }
    }
}
