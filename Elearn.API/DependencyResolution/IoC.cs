using StructureMap;

namespace Elearn.API.DependencyResolution
{

    public static class IoC
    {
        public static IContainer Initialize()
        {
            return new Container(c => c.AddRegistry<DefaultRegistry>());
        }
    }
}
