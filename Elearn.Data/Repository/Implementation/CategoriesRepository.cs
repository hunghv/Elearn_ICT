using Elearn.Data.Common;
using Elearn.Data.Entities;
using Elearn.Data.Repository.Base;

namespace Elearn.Data.Repository.Implementation
{
    public class CategoriesRepository:EntityBaseRepository<Categories>, Interfaces.ICategoriesRepository
    {
        public CategoriesRepository(ElearnContext context) : base(context)
        {
        }
    }
}
