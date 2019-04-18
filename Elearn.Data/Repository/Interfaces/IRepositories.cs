using Elearn.Data.Entities;
using Elearn.Data.Repository.Base;

namespace Elearn.Data.Repository.Interfaces
{
    public interface ICoverImagesRepository : IEntityBaseRepository<CoverImage> { }
    public interface ICategoriesRepository : IEntityBaseRepository<Categories> { }
    public interface IUserRoleRepository : IEntityBaseRepository<UserRole> { }
    public interface IAttachmentRepository : IEntityBaseRepository<Attachment> { }
    public interface ICountryRepository : IEntityBaseRepository<Country> { }
    public interface IRoleRepository : IEntityBaseRepository<Role> { }
    public interface IStatusRepository : IEntityBaseRepository<Status> { }
    public interface IUserLoginHistoryRepository : IEntityBaseRepository<UserLoginHistory> { }
    public interface IUserProfileRepository : IEntityBaseRepository<UserProfile> { }
}
