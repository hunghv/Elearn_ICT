using System.Web.Http;
using Elearn.API.Common;
using Elearn.API.DependencyResolution;
[assembly: WebActivatorEx.PostApplicationStartMethod(typeof(StructuremapWebApi), "Start")]

namespace Elearn.API.Common
{
    public static class StructuremapWebApi
    {
        public static void Start()
        {
            var container = StructuremapMvc.StructureMapDependencyScope.Container;
            GlobalConfiguration.Configuration.DependencyResolver = new StructureMapWebApiDependencyResolver(container);
        }
    }
}