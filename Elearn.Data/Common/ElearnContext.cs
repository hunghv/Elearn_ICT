using System.Data.Entity;

namespace Elearn.Data.Common
{
    public class ElearnContext : DbContext
    {
        public ElearnContext() : base("ElearnContext")
        {
        }
    }
}
