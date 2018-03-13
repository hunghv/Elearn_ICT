using Elearn.Data.Common;
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
        }

       
    }
}
