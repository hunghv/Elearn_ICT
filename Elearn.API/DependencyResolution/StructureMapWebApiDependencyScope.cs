using System.Web.Http.Dependencies;
using StructureMap;

namespace Elearn.API.DependencyResolution
{
    public class StructureMapWebApiDependencyScope : StructureMapDependencyScope, IDependencyScope
    {
        public StructureMapWebApiDependencyScope(IContainer container)
            : base(container)
        {
        }
    }
}
