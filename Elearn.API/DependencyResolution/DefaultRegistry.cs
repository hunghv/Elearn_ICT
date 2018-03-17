using Elearn.Data.Common;
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
            For<ICategoriesService>().Use<CategoriesService>();

            //Repository
            For<ICategoriesRepository>().Use<CategoriesRepository>();
        }

       
    }
}
