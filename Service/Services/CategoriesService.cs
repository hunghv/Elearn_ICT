using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Elearn.Data.Entities;
using Elearn.Data.Repository.Interfaces;
using Service.Services.Interfaces;
using Service.ViewModels.Request;
using Service.ViewModels.Response;

namespace Service.Services
{
    public class CategoriesService: ICategoriesService
    {
        private readonly ICategoriesRepository _repository;

        public CategoriesService(ICategoriesRepository repository)
        {
            _repository = repository;
        }

        public List<CategoriesResponse> GetCategories(CategoriesRequest request)
        {
            IQueryable<Categories> query = _repository.GetAllNoneDeleted().OrderBy(x => x.Name);
            var totalCount = query.Count();

            if (request != null && request.Skip.HasValue && request.Take.HasValue)
                query = query.Skip(request.Skip.Value).Take(request.Take.Value == 0 ? totalCount : request.Take.Value);

            var categorieses = query.ToList();
            var result = Mapper.Map<List<CategoriesResponse>>(categorieses);
            return result;
        }
    }
}
