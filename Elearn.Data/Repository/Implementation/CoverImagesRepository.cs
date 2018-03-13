using Elearn.Data.Common;
using Elearn.Data.Entities;
using Elearn.Data.Repository.Base;
using Elearn.Data.Repository.Interfaces;

namespace Elearn.Data.Repository.Implementation
{
    public class CoverImagesRepository : EntityBaseRepository<CoverImage>, ICoverImagesRepository
    {
        public CoverImagesRepository(ElearnContext context) : base(context) { }
    }
}
