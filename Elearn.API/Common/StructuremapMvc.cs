using System.Web.Mvc;
using Elearn.API.Common;
using Elearn.API.DependencyResolution;
using Microsoft.Web.Infrastructure.DynamicModuleHelper;
using StructureMap;
using WebActivatorEx;

[assembly: System.Web.PreApplicationStartMethod(typeof(StructuremapMvc), "Start")]
[assembly: ApplicationShutdownMethod(typeof(StructuremapMvc), "End")]
namespace Elearn.API.Common
{
    public static class StructuremapMvc
    {
        #region Public Properties

        private static IContainer _container;
        public static StructureMapDependencyScope StructureMapDependencyScope { get; set; }

        #endregion

        #region Public Methods and Operators

        public static void End()
        {
            StructureMapDependencyScope.Dispose();
        }

        public static void Start()
        {
            _container = IoC.Initialize();
            StructureMapDependencyScope = new StructureMapDependencyScope(_container);
            DependencyResolver.SetResolver(StructureMapDependencyScope);
            DynamicModuleUtility.RegisterModule(typeof(StructureMapScopeModule));
        }

        #endregion
    }
}
