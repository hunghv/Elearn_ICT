﻿using Elearn.Data.Common;
using Elearn.Data.Repository.Implementation;
using Elearn.Data.Repository.Interfaces;
using Service.Services;
using Service.Services.Interfaces;
using StructureMap;

namespace Elearn.API.DependencyResolution
{
   public class DefaultRegistry : Registry
    {
        public DefaultRegistry()
        {
            // Dependency Resolution inrect Interfaces with Responsitory
            Scan(
                scan =>
                {
                    scan.TheCallingAssembly();
                    scan.WithDefaultConventions();
                });
            //DataContext

            For<ElearnContext>().Use<ElearnContext>();

            //Services
            For<IAdminServices>().Use<AdminServices>();
            For<IUserProfileServices>().Use<UserProfileServices>();
            For<IAttachmentServices>().Use<AttachmentServices>();

            //Repository
            For<ICategoriesRepository>().Use<CategoriesRepository>();
            For<IAttachmentRepository>().Use<AttachmentRepository>();
            For<ICountryRepository>().Use<CountryRepository>();
            For<ICoverImagesRepository>().Use<CoverImagesRepository>();
            For<IRoleRepository>().Use<RoleRepository>();
            For<IStatusRepository>().Use<StatusRepository>();
            For<IUserLoginHistoryRepository>().Use<UserLoginHistoryRepository>();
            For<IUserProfileRepository>().Use<UserProfileRepository>();
            For<IUserRoleRepository>().Use<UserRoleRepository>();
        }

       
    }
}
